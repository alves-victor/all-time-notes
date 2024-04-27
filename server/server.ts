import Parse from "parse/node";

Parse.serverURL = "https://parseapi.back4app.com"

Parse.initialize(
    process.env.NEXT_PUBLIC_APPLICATION_KEY as string,
    process.env.NEXT_PUBLIC_JAVASCRIPT_KEY as string,
)

export async function findVitt(){
    const query: Parse.Query = new Parse.Query('_User')

    query.equalTo("username", "Vitt")

    const results: Parse.Object[] = await query.find()

    try{
        const username: string = results[0].get("username") 
        return username 
    }
    catch (error: any){
        return "Erro de fetch, " + error
    }
}