export function formatDate(date:string):string{
    const newDate = new Date(date).toLocaleString("en-US",{
        year:"numeric",
        month:"short",
        day: "numeric",
        hour:"numeric",
        minute:"numeric"
    })
    return newDate
}