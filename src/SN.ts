import './Fields';
import './FieldSettings';
import './Schema';
import './Content';
import './ContentTypes';
import './Collection';
import './Common';
import './ODataHelper';
import './ODataApi';
import './ODataApiActionObservables';
import './Resources';
import './Security';

export { Fields } from './Fields';
export { FieldSettings } from './FieldSettings';
export { Schemas } from './Schema';
export { Content } from './Content';
export { ContentTypes } from './ContentTypes';
export { Collection } from './Collection';
export { Login, Logout, GetVersionInfo, GetAllContentTypes } from './Common';
export { ODataHelper } from './ODataHelper';
export { ODataApiActionObservables } from './ODataApiActionObservables';
export { ODataApi } from './ODataApi';
export { Resources } from './Resources';
export { Security } from './Security';

import {Properties} from 'ts-json-properties';
import * as appRoot from 'app-root-path';

Properties.initialize();
const rootPath = appRoot.path;
Properties.initialize(appRoot.path + '/properties.json');