
import { Content } from './Content';
import { Subject, Observable } from '@reactivex/rxjs';
import { SavedContent, ODataHelper, Authentication } from './SN';

export class Upload {
    public static File<T extends Content>(scope: SavedContent<Content>, File: File, ContentType: { new(...args): T } = File as any, PropertyName: keyof T | 'Binary' = 'Binary', Settings: {
        Overwrite: boolean,
        UseChunk: boolean
    } = {
            Overwrite: false,
            UseChunk: false
        }): Observable<SavedContent<T>> {

        return scope.GetRepository().Authentication.State.skipWhile(state => state === Authentication.LoginState.Pending)
            .first()
            .flatMap(state => {
                const subject = new Subject<SavedContent<T>>();
                const formData = new FormData();
                formData.append(File.name || 'File', File);
                formData.set('ChunkToken', '0*0*False*False');
                formData.set('FileName', File.name)


                const request = new XMLHttpRequest();
                request.withCredentials = true;
                const path = ODataHelper.joinPaths(scope.GetRepository().ODataBaseUrl, scope.GetFullPath(), 'upload');
                request.open('POST', path);

                request.onreadystatechange = () => {
                    if (request.readyState === 4) {

                        switch (request.status) {
                            case 200:
                                try {
                                    const contentId = JSON.parse(request.response).Id;
                                    scope.GetRepository().Load(contentId, undefined, ContentType).subscribe(c => {
                                        subject.next(c);
                                        subject.complete();
                                        scope.GetRepository().Events.Trigger.ContentCreated({ Content: c });
                                    }, err => {
                                        scope.GetRepository().Events.Trigger.ContentCreateFailed({ Error: err, Content: { Name: File.name } as any });
                                        subject.error(err);

                                    })
                                } catch (error) {
                                    scope.GetRepository().Events.Trigger.ContentCreateFailed({ Error: error, Content: { Name: File.name } as any });
                                    subject.error(error);
                                }
                                break;
                            default:
                                subject.error({ message: 'Invalid Request status', request })
                        }
                    }
                }
                request.send(formData);
                return subject.asObservable();
            })
    }
}