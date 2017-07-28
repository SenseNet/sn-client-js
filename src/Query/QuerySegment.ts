// Query, Not
import { Query } from '.';
import { Content } from '../Content';

export class QuerySegment<TReturns>{

    constructor(protected readonly queryRef: Query<TReturns>) {

    }

}

export class QueryExpression<TReturns> extends QuerySegment<TReturns>{

    TypeIs<TNewType extends Content>(newTypeAssertion: { new(...args: any[]): TNewType }) {
        return this.Finialize<TReturns | TNewType>()
    }

    private Finialize<TReturnsExtended = TReturns>() {
        this.queryRef.addSegment(this);
        return new QueryOperators<TReturnsExtended>(this.queryRef);
    }
}

// And, Or, Etc...

export class QueryOperators<TReturns> extends QuerySegment<TReturns>{

    private stringValue: string;
    public get And() {
        this.stringValue = ' AND ';
        return this.Finialize();
    }


    public get Or() {
        this.stringValue = ' OR ';
        return this.Finialize();
    }

    private Finialize<TReturnsExtended = TReturns>() {
        this.queryRef.addSegment(this);
        return new QueryExpression<TReturnsExtended>(this.queryRef);
    }

}