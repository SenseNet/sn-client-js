/**
 * @module Query
 * */ /** */

import { Query } from '.';
import { Content, isContent } from '../Content';

/**
 * Represents a query expression segment
 */
export class QuerySegment<TReturns extends Content>{
    
    /**
     * Escapes a String value (except '?' and '*' characters for wildcards)
     * @param {string} value The String value to be escaped
     * @returns {string} The escaped value
     */
    protected escapeValue(value: string): string{
        return typeof value === 'string' ? value.replace(/([\!\+\&\|\(\)\[\]\{\}\^\~\:\"])/g, '\\$1') : value;
    }

    protected stringValue: string;

    /**
     * A '.SORT' Content Query segment
     * @param {K} field The name of the field
     * @param {boolean} reverse Sort in reverse order, false by default
     */
    public Sort<K extends keyof TReturns['options']>(field: K, reverse: boolean = false){
        this.stringValue = `.${reverse ? 'REVERSESORT' : 'SORT'}:'${field}'`;
        return this.FinializeSegment();
    }

    /**
     * A '.TOP' Content Query segment
     * @param {number} topCount The TOP item count
     */
    public Top(topCount: number){
        this.stringValue = `.TOP:${topCount}`;
        return this.FinializeSegment();
    }    

    /**
     * Adds a '.SKIP' Content Query segment
     * @param {number} skipCount Items to skip
     */

    public Skip(skipCount: number){
        this.stringValue = `.SKIP:${skipCount}`;
        return this.FinializeSegment();
    }  

    /**
     * @returns {string} a segment string value
     */
    public toString(){
        return this.stringValue;
    }

    constructor(protected readonly queryRef: Query<TReturns>) {

    }

    protected FinializeSegment() {
        this.queryRef.addSegment(this);
        return new QuerySegment(this.queryRef);
    }

}

/**
 * Represents a sensenet Content Query expression
 */
export class QueryExpression<TReturns extends Content> extends QuerySegment<TReturns> {

    /**
     * A plain string as Query term
     * @param {string} term The Query term
     * @returns { QueryOperator<TReturns> } The Next query operator (fluent)
     */
    Term(term: string){
        this.stringValue = term;
        return this.Finialize();
    }
    
    /**
     * Adds an InTree content query expression
     * @param {string | Content } path The path string or content that will be used as a root
     * @returns { QueryOperator<TReturns> } The Next query operator (fluent)
     */
    InTree(path: string | Content){
        const pathValue = this.escapeValue(isContent(path) && path.Path ? path.Path : path.toString())
        this.stringValue = `+InTree:"${pathValue}"`;
        return this.Finialize();
    }

    /**
     * Adds an InFolder content query expression
     * @param {string | Content } path The path string or content that will be used as a root
     * @returns { QueryOperator<TReturns> } The Next query operator (fluent)
     */
    InFolder(path: string | Content){
        const pathValue = this.escapeValue(isContent(path) && path.Path ? path.Path : path.toString())
        this.stringValue = `+InFolder:"${pathValue}"`;
        return this.Finialize();
    }

    /**
     * Adds a Type content query expression and casts the rest of the expression to a new type
     * @param {{ new(...args: any[]): TNewType }} newTypeAssertion The path string or content that will be used as a root
     * @returns { QueryOperator<TNewType> } The Next query operator (fluent)
     */

    Type<TNewType extends Content = Content>(newTypeAssertion: { new(...args: any[]): TNewType }) {
        this.stringValue = `+Type:${newTypeAssertion.name}`;
        return this.Finialize<TNewType>()
    }

    /**
     * Adds a TypeIs content query expression and casts the rest of the expression to a new type
     * @param {{ new(...args: any[]): TNewType }} newTypeAssertion The path string or content that will be used as a root
     * @returns { QueryOperator<TNewType> } The Next query operator (fluent)
     */   
    TypeIs<TNewType extends Content = Content>(newTypeAssertion: { new(...args: any[]): TNewType }) {
        this.stringValue = `+TypeIs:${newTypeAssertion.name}`;
        return this.Finialize<TNewType>()
    }

    /**
     * Field equality check content query expression (e.g. +FieldName:'value')
     * @param { K } FieldName The name of the Field to be checked
     * @param { TReturns[K] } value The value that will be checked. You can use '?' and '*' wildcards
     * @returns { QueryOperator<TReturns> } The Next query operator (fluent)
     */    
    Equals<K extends keyof TReturns['options']>(fieldName: K, value: TReturns[K]){
        this.stringValue = `+${fieldName}:'${this.escapeValue(value)}'`;
        return this.Finialize();
    }

    /**
     * Field equality and NOT operator combination. (e.g. +NOT(FieldName:'value'))
     * @param { K } FieldName The name of the Field to be checked
     * @param { TReturns[K] } value The value that will be checked. You can use '?' and '*' wildcards
     * @returns { QueryOperator<TReturns> } The Next query operator (fluent)
     */    
    
    NotEquals<K extends keyof TReturns['options']>(fieldName: K, value: TReturns[K]){
        this.stringValue = `+NOT(${fieldName}:'${this.escapeValue(value)}')`;
        return this.Finialize();
    }    

    /**
     * Range search query expression
     * @param { K } fieldName he name of the Field to be checked
     * @param { TReturns[K] } minValue The minimum allowed value
     * @param { TReturns[K] } maxValue The maximum allowed value
     * @param { boolean } minimumInclusive Lower limit will be inclusive / exclusive
     * @param { boolean } maximumInclusive Upper limit will be inclusive / exclusive
     */    
    Between<K extends keyof TReturns['options']>(fieldName: K, minValue: TReturns[K], maxValue: TReturns[K], minimumInclusive: boolean = false, maximumInclusive: boolean = false){
        this.stringValue = `+${fieldName}:${minimumInclusive ? '[' : '{'}'${this.escapeValue(minValue)}' TO '${this.escapeValue(maxValue)}'${maximumInclusive ? ']' : '}'}`;
        return this.Finialize();
    }


    /**
     * Greather than query expression (+FieldName:>'value')
     * @param { K } fieldName he name of the Field to be checked 
     * @param { TReturns[K] } minValue The minimum allowed value 
     * @param { boolean } minimumInclusive Lower limit will be inclusive / exclusive 
     */
    GreatherThan<K extends keyof TReturns['options']>(fieldName: K, minValue: TReturns[K], minimumInclusive: boolean = false){
        this.stringValue = `+${fieldName}:>${minimumInclusive ? '=' : ''}'${this.escapeValue(minValue)}'`;
        return this.Finialize();
    }
    

    /**
     * Less than query expression (+FieldName:<'value')
     * @param { K } fieldName he name of the Field to be checked 
     * @param { TReturns[K] } maxValue The maximum allowed value 
     * @param { boolean } maximumInclusive Upper limit will be inclusive / exclusive 
     */
    LessThan<K extends keyof TReturns['options']>(fieldName: K, maxValue: TReturns[K], maximumInclusive: boolean = false){
        this.stringValue = `+${fieldName}:<${maximumInclusive ? '=' : ''}'${this.escapeValue(maxValue)}'`;
        return this.Finialize();
    }

    /**
     * A Nested query expression
     * @param {(first: QueryExpression<TReturns>) => QuerySegment<TReturns>)} build The Expression builder method
     */
    Query(build: (first: QueryExpression<TReturns>) => QuerySegment<TReturns>){
        const innerQuery = new Query(build);
        this.stringValue = `(${innerQuery.toString()})`;
        return this.Finialize();
    }

    /**
     * A Nested NOT query expression
     * @param {(first: QueryExpression<TReturns>) => QuerySegment<TReturns>)} build The Expression builder method
     */
    Not(build: (first: QueryExpression<TReturns>) => QuerySegment<TReturns>){
        const innerQuery = new Query(build);
        this.stringValue = `NOT(${innerQuery.toString()})`;
        return this.Finialize();
    }

    protected Finialize<TReturnsExtended extends Content = TReturns>(): QueryOperators<TReturnsExtended> {
        this.queryRef.addSegment(this);
        return new QueryOperators<TReturnsExtended>(this.queryRef as any as Query<TReturnsExtended>);
    }
}

// And, Or, Etc...
export class QueryOperators<TReturns extends Content> extends QuerySegment<TReturns>{

    /**
     * AND Content Query operator
     */
    public get And() {
        this.stringValue = ' AND ';
        return this.Finialize();
    }


    /**
     * OR Content Query operator
     */
    public get Or() {
        this.stringValue = ' OR ';
        return this.Finialize();
    }

    protected Finialize() {
        this.queryRef.addSegment(this);
        return new QueryExpression(this.queryRef);
    }

}