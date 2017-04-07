import * as CollectionTests from './CollectionTests';
import * as ContentTests from './ContentTests';
import * as ContentTypeTests from './ContentTypeTests';
import * as FieldSettingsTest from './FieldSettingsTest';
import * as ComplexTypesTests from './ComplexTypesTests';
import * as ODataApiTests from './ODataApiTests';
import * as ODataHelperTests from './ODataHelperTests';
import * as SchemaTests from './SchemaTests';

import { Setup } from '../src/Setup';

Setup.InitializeConfig();

export {
    CollectionTests,
    ContentTests,
    ContentTypeTests,
    FieldSettingsTest,
    ComplexTypesTests,
    ODataApiTests,
    ODataHelperTests,
    SchemaTests
}