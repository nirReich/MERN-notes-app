export function assertIsDefined<T>(val:T):asserts val is NonNullable<T> {
    if(!val){
        throw Error(`Expected a well defined value, but received ${val}` );
    }
}