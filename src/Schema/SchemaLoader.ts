import { BinaryField } from '../BinaryField';
import { ContentType } from '../ContentTypes';
import { BaseRepository } from '../Repository';
import { Schema } from '../Schemas';
import { Content } from '../SN';

export class SchemaLoader {

    private static async getCtdXml(contentType: Content<ContentType>): Promise<Document> {
        return new Promise<Document>((resolve, reject) => {
            const url = (contentType.Binary as any as BinaryField<ContentType>).GetDownloadUrl();
            contentType.GetRepository().HttpProviderRef.Ajax(String, {
                url
            }).subscribe((result) => {
                try {
                    const parser = new DOMParser();
                    const document = parser.parseFromString(result.toString(), 'text/xml');
                    resolve(document);

                } catch (error) {
                    reject(error);
                }
            }, (err) => reject(err));
        });
    }

    private static async createSchemaFromCtd(xml: Document): Promise<Schema> {
        /**/
        const schema = new Schema();

        return schema;
    }

    public static async LoadFromRepository(repo: BaseRepository): Promise<Map<string, Schema>> {
        /** */
        const schemas = new Map<string, Schema>();

        const contentTypes = await repo.CreateQuery((q) => q.TypeIs(ContentType)).Exec().toPromise();

        for (const contentType in contentTypes.Result) {
            if (contentTypes.Result[contentType]) {
                const xml = await this.getCtdXml(contentTypes.Result[contentType]);
                const schema = await this.createSchemaFromCtd(xml);
                schemas.set(schema.ContentTypeName, schema);
            }
        }
        return schemas;
    }
}
