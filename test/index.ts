export * from './HttpProviderTests';
export * from './BinaryFieldTests';
export * from './JwtServiceTests';
export * from './CollectionTests';
export * from './ContentTests';
export * from './ContentTypeTests';
export * from './ContentReferenceFieldTests';
export * from './ContentListReferenceFieldTests';
export * from './ContentSerializerTests';
export * from './ControlMapperTests';
export * from './FieldSettingsTest';
export * from './ComplexTypesTests';
export * from './ODataApiTests';
export * from './ODataHelperTests';
export * from './RepositoryTests';
export * from './RetrierTests';
export * from './SchemaTests';
export * from './SnConfigTests';
export * from './TokenTests';
export * from './TokenStoreTests';

export *  from './QueryTests';

// tslint:disable:naming-convention

(global as any).File = class {
    public slice(from: number, size: number) {
        return '';
    }

    constructor(fileData: any, public readonly name: string) {

    }
};
