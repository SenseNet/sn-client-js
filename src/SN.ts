/**
 * @module sn-client-js
 * @preferred
 *
 * @description The main entry module of the package
 */ /** */

  import 'rxjs/add/observable/from';
  import 'rxjs/add/observable/of';
  import 'rxjs/add/operator/share';

  import 'rxjs/add/operator/distinctUntilChanged';
  import 'rxjs/add/operator/filter';
  import 'rxjs/add/operator/first';
  import 'rxjs/add/operator/first';
  import 'rxjs/add/operator/map';
  import 'rxjs/add/operator/mergeMap';
  import 'rxjs/add/operator/share';
  import 'rxjs/add/operator/skipWhile';

  import * as Authentication from './Authentication';
  import * as ComplexTypes from './ComplexTypes';
  import * as ContentTypes from './ContentTypes';
  import * as Repository from './Repository';
  export * from './Content';
  export * from './ContentSerializer';
  export * from './ContentReferences';
  import * as FieldSettings from './FieldSettings';
  export * from './Retrier';
  import * as Mocks from '../test/Mocks';
  import * as Collection from './Collection';
  import * as Config from './Config';
  import * as Enums from './Enums';
  import * as HttpProviders from './HttpProviders';
  import * as ODataApi from './ODataApi';
  import * as ODataHelper from './ODataHelper';
  import * as Resources from './Resources';
  import * as Schemas from './Schemas';
  import * as Security from './Security';
  export * from './Query';
  export *  from './ControlMapper';

  export {
    Authentication, ComplexTypes, FieldSettings, Schemas, Enums,
    ContentTypes, Collection, ODataHelper, ODataApi,
    Resources, Security, HttpProviders, Repository, Config, Mocks,
};
