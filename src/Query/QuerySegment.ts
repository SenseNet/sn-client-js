import { Query } from '.';
import { Content, isContent } from '../Content';

export class QuerySegment<TReturns extends Content>{
    protected stringValue: string;

    public toString(){
        return this.stringValue;
    }

    constructor(protected readonly queryRef: Query<TReturns>) {

    }

}

// Equals, Not Equals, TypeIs, etc...
export class QueryExpression<TReturns extends Content> extends QuerySegment<TReturns> {

    private escapeValue(value: string): string{
        return typeof value === 'string' ? value.replace(/([\!\+\&\|\(\)\[\]\{\}\^\~\:\"])/g, '\\$1') : value;
    }

    InTree(path: string | Content){
        const pathValue = this.escapeValue(isContent(path) && path.Path ? path.Path : path.toString())
        this.stringValue = `+InTree:"${pathValue}"`;
        return this.Finialize();
    }

    InFolder(path: string | Content){
        const pathValue = this.escapeValue(isContent(path) && path.Path ? path.Path : path.toString())
        this.stringValue = `+InFolder:"${pathValue}"`;
        return this.Finialize();
    }

    Type<TNewType extends Content = Content>(newTypeAssertion: { new(...args: any[]): TNewType }) {
        this.stringValue = `+Type:${newTypeAssertion.name}`;
        return this.Finialize<TNewType>()
    }

    TypeIs<TNewType extends Content = Content>(newTypeAssertion: { new(...args: any[]): TNewType }) {
        this.stringValue = `+TypeIs:${newTypeAssertion.name}`;
        return this.Finialize<TNewType>()
    }

    Equals<K extends keyof TReturns['options']>(fieldName: K, value: TReturns[K]){
        this.stringValue = `+${fieldName}:'${this.escapeValue(value)}'`;
        return this.Finialize();
    }

    NotEquals<K extends keyof TReturns['options']>(fieldName: K, value: TReturns[K]){
        this.stringValue = `+NOT(${fieldName}:'${this.escapeValue(value)}')`;
        return this.Finialize();
    }    

    Between<K extends keyof TReturns['options']>(fieldName: K, minValue: TReturns[K], maxValue: TReturns[K], minimumInclusive: boolean = false, maximumInclusive: boolean = false){
        this.stringValue = `+${fieldName}:${minimumInclusive ? '[' : '{'}'${this.escapeValue(minValue)}' TO '${this.escapeValue(maxValue)}'${maximumInclusive ? ']' : '}'}`;
        return this.Finialize();
    }


    GreatherThan<K extends keyof TReturns['options']>(fieldName: K, minValue: TReturns[K], minimumInclusive: boolean = false){
        this.stringValue = `+${fieldName}:>${minimumInclusive ? '=' : ''}'${this.escapeValue(minValue)}'`;
        return this.Finialize();
    }
    

    LessThan<K extends keyof TReturns['options']>(fieldName: K, maxValue: TReturns[K], maximumInclusive: boolean = false){
        this.stringValue = `+${fieldName}:<${maximumInclusive ? '=' : ''}'${this.escapeValue(maxValue)}'`;
        return this.Finialize();
    }    

    private Finialize<TReturnsExtended extends Content = TReturns>(): QueryOperators<TReturnsExtended> {
        this.queryRef.addSegment(this);
        return new QueryOperators<TReturnsExtended>(this.queryRef as any as Query<TReturnsExtended>);
    }
}

// And, Or, Etc...
export class QueryOperators<TReturns extends Content> extends QuerySegment<TReturns>{

    public get And() {
        this.stringValue = ' AND ';
        return this.Finialize();
    }


    public get Or() {
        this.stringValue = ' OR ';
        return this.Finialize();
    }

    private Finialize() {
        this.queryRef.addSegment(this);
        return new QueryExpression(this.queryRef);
    }

}