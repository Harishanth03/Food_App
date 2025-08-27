import {Account, Avatars, Client, Databases, ID} from "react-native-appwrite";
import {CreateUserParams, SignInParams} from "@/type";
import {id} from "postcss-selector-parser";

export const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    platform: "com.harishanth.fastfood",
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    databaseId: "68ab218d00347e5589bd",
    userCollectionId: "68ab21c6003ab54c6d20"
}

export const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform)

export const account = new Account(client);
export const database = new Databases(client)
export const avatar = new Avatars(client)

export const createUser = async ({email,password,name}: CreateUserParams) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password, name)

        if(!newAccount) throw Error(`Account with id ${id} already exists`)

        await signIn({email, password})

        const avartarUrl = avatar.getInitialsURL(name)

        return await database.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,name,avatar:avartarUrl
            }
        )

    }
    catch (error) {
        throw new Error(error as string)
    }

}

export const signIn = async ({email, password} : SignInParams) => {
    try {
        const session = await account.createEmailPasswordSession(email, password)

    }
    catch (error) {
        throw new Error(error as string)
    }

}