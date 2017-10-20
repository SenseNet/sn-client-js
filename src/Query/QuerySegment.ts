/**
 * @module Query
 * */ /** */

import { Query } from '.';
import { SavedContent, IContent } from '../Content';

/**
 * Represents a query expression segment
 */
export class QuerySegment<TReturns extends IContent>{

    /**
     * Escapes a String value (except '?' and '*' characters for wildcards)
     * @param {string} value The String value to be escaped
     * @returns {string} The escaped value
     */
    protected escapeValue(value: string): string{
        return typeof value === 'string' ? value.replace(/([\!\+\&\|\(\)\[\]\{\}\^\~\:\"])/g, '\\$1') : value;
    }

    protected _stringValue: string;

    /**
     * A '.SORT' Content Query segment
     * @param {K} field The name of the field
     * @param {boolean} reverse Sort in reverse order, false by default
     */
    public Sort<K extends keyof TReturns>(field: K, reverse: boolean = false){
        this._stringValue = ` .${reverse ? 'REVERSESORT' : 'SORT'}:'${field}'`;
        return this.finializeSegment();
    }

    /**
     * A '.TOP' Content Query segment
     * @param {number} topCount The TOP item count
     */
    public Top(topCount: number){
        this._stringValue = ` .TOP:${topCount}`;
        return this.finializeSegment();
    }

    /**
     * Adds a '.SKIP' Content Query segment
     * @param {number} skipCount Items to skip
     */

    public Skip(skipCount: number){
        this._stringValue = ` .SKIP:${skipCount}`;
        return this.finializeSegment();
    }

    /**
     * @returns {string} a segment string value
     */
    public toString(){
        return this._stringValue;
    }

    constructor(protected readonly _queryRef: Query<TReturns>) {

    }

    protected finializeSegment() {
        this._queryRef.AddSegment(this);
        return new QuerySegment(this._queryRef);
    }

}

/**
 * Represents a sensenet Content Query expression
 */
export class QueryExpression<TReturns extends IContent> extends QuerySegment<TReturns> {

    /**
     * A plain string as Query term
     * @param {string} term The Query term
     * @returns { QueryOperator<TReturns> } The Next query operator (fluent)
     */
    Term(term: string){
        this._stringValue = term;
        return this.finialize();
    }

    /**
     * Adds an InTree content query expression
     * @param {string | Content } path The path string or content that will be used as a root
     * @returns { QueryOperator<TReturns> } The Next query operator (fluent)
     */
    InTree(path: string | SavedContent){
        const pathValue = this.escapeValue((path as SavedContent).Path ? (path as SavedContent).Path : path.toString())
        this._stringValue = `InTree:"${pathValue}"`;
        return this.finialize();
    }

    /**
     * Adds an InFolder content query expression
     * @param {string | Content } path The path string or content that will be used as a root
     * @returns { QueryOperator<TReturns> } The Next query operator (fluent)
     */
    InFolder(path: string | SavedContent){
        const pathValue = this.escapeValue((path as SavedContent).Path ? (path as SavedContent).Path : path.toString())
        this._stringValue = `InFolder:"${pathValue}"`;
        return this.finialize();
    }

    /**
     * Adds a Type content query expression and casts the rest of the expression to a new type
     * @param {{ new(...args: any[]): TNewType }} newTypeAssertion The path string or content that will be used as a root
     * @returns { QueryOperator<TNewType> } The Next query operator (fluent)
     */

    Type<TNewType extends IContent = IContent>(newTypeAssertion: { new(...args: any[]): TNewType }) {
        this._stringValue = `Type:${newTypeAssertion.name}`;
        return this.finialize<TNewType>()
    }

    /**
     * Adds a TypeIs content query expression and casts the rest of the expression to a new type
     * @param {{ new(...args: any[]): TNewType }} newTypeAssertion The path string or content that will be used as a root
     * @returns { QueryOperator<TNewType> } The Next query operator (fluent)
     */
    TypeIs<TNewType extends IContent = IContent>(newTypeAssertion: { new(...args: any[]): TNewType }) {
        this._stringValue = `TypeIs:${newTypeAssertion.name}`;
        return this.finialize<TNewType>()
    }

    /**
     * Field equality check content query expression (e.g. +FieldName:'value')
     * @param { K } FieldName The name of the Field to be checked
     * @param { TReturns[K] } value The value that will be checked. You can use '?' and '*' wildcards
     * @returns { QueryOperator<TReturns> } The Next query operator (fluent)
     */
    Equals<K extends keyof TReturns>(fieldName: K | '_Text', value: TReturns[K]){
        this._stringValue = `${fieldName}:'${this.escapeValue(value)}'`;
        return this.finialize();
    }

    /**
     * Field equality and NOT operator combination. (e.g. +NOT(FieldName:'value'))
     * @param { K } FieldName The name of the Field to be checked
     * @param { TReturns[K] } value The value that will be checked. You can use '?' and '*' wildcards
     * @returns { QueryOperator<TReturns> } The Next query operator (fluent)
     */

    NotEquals<K extends keyof TReturns>(fieldName: K, value: TReturns[K]){
        this._stringValue = `NOT(${fieldName}:'${this.escapeValue(value)}')`;
        return this.finialize();
    }

    /**
     * Range search query expression
     * @param { K } fieldName he name of the Field to be checked
     * @param { TReturns[K] } minValue The minimum allowed value
     * @param { TReturns[K] } maxValue The maximum allowed value
     * @param { boolean } minimumInclusive Lower limit will be inclusive / exclusive
     * @param { boolean } maximumInclusive Upper limit will be inclusive / exclusive
     */
    Between<K extends keyof TReturns>(fieldName: K, minValue: TReturns[K], maxValue: TReturns[K], minimumInclusive: boolean = false, maximumInclusive: boolean = false){
        this._stringValue = `${fieldName}:${minimumInclusive ? '[' : '{'}'${this.escapeValue(minValue)}' TO '${this.escapeValue(maxValue)}'${maximumInclusive ? ']' : '}'}`;
        return this.finialize();
    }


    /**
     * Greather than query expression (+FieldName:>'value')
     * @param { K } fieldName he name of the Field to be checked
     * @param { TReturns[K] } minValue The minimum allowed value
     * @param { boolean } minimumInclusive Lower limit will be inclusive / exclusive
     */
    GreatherThan<K extends keyof TReturns>(fieldName: K, minValue: TReturns[K], minimumInclusive: boolean = false){
        this._stringValue = `${fieldName}:>${minimumInclusive ? '=' : ''}'${this.escapeValue(minValue)}'`;
        return this.finialize();
    }


    /**
     * Less than query expression (+FieldName:<'value')
     * @param { K } fieldName he name of the Field to be checked
     * @param { TReturns[K] } maxValue The maximum allowed value
     * @param { boolean } maximumInclusive Upper limit will be inclusive / exclusive
     */
    LessThan<K extends keyof TReturns>(fieldName: K, maxValue: TReturns[K], maximumInclusive: boolean = false){
        this._stringValue = `${fieldName}:<${maximumInclusive ? '=' : ''}'${this.escapeValue(maxValue)}'`;
        return this.finialize();
    }

    /**
     * A Nested query expression
     * @param {(first: QueryExpression<TReturns>) => QuerySegment<TReturns>)} build The Expression builder method
     */
    Query(build: (first: QueryExpression<TReturns>) => QuerySegment<TReturns>){
        const innerQuery = new Query(build);
        this._stringValue = `(${innerQuery.toString()})`;
        return this.finialize();
    }

    /**
     * A Nested NOT query expression
     * @param {(first: QueryExpression<TReturns>) => QuerySegment<TReturns>)} build The Expression builder method
     */
    Not(build: (first: QueryExpression<TReturns>) => QuerySegment<TReturns>){
        const innerQuery = new Query(build);
        this._stringValue = `NOT(${innerQuery.toString()})`;
        return this.finialize();
    }

    protected finialize<TReturnsExtended extends IContent = TReturns>(): QueryOperators<TReturnsExtended> {
        this._queryRef.AddSegment(this);
        return new QueryOperators<TReturnsExtended>(this._queryRef as any as Query<TReturnsExtended>);
    }
}

// And, Or, Etc...
export class QueryOperators<TReturns extends IContent> extends QuerySegment<TReturns>{

    /**
     * AND Content Query operator
     */
    public get And() {
        this._stringValue = ' AND ';
        return this.finialize();
    }


    /**
     * OR Content Query operator
     */
    public get Or() {
        this._stringValue = ' OR ';
        return this.finialize();
    }

    protected finialize() {
        this._queryRef.AddSegment(this);
        return new QueryExpression(this._queryRef);
    }

}