import { Inngest } from "inngest"
import { connectDB } from "./db.js"
import User from "../models/User.js"
import { deleteStreamUser, upsertStreamUser } from "./stream.js";

export const inngest = new Inngest({ id: "leetcode-pro" });

const syncUser = inngest.createFunction(
    { 
        id: "sync-user",
        triggers: { event: "clerk/user.created" }
    },
    async ({event, step}) => {
        const {id, email_addresses, first_name, last_name, image_url} = event.data
        
        const newUser = {
            clerkId: id,
            email: email_addresses[0]?.email_address,
            name: `${first_name || ""} ${last_name || ""}`,
            profileImage: image_url
        };
        await step.run("sync-to-mongodb", async() => {
            await connectDB();
            await User.updateOne(
                { clerkId: id },
                { $set: newUser },
                { 
                    upsert: true,
                    runValidators: true,
                    setDefaultsOnInsert: true
                 }
            );
        });

        await step.run("sync-to-stream", async() => {
            await upsertStreamUser({
                id: newUser.clerkId.toString(),
                name: newUser.name,
                image: newUser.profileImage
            });
        });

    }
);

const deleteUserFromDB = inngest.createFunction(
    {
        id: "delete-user-from-db",
        triggers: { event: "clerk/user.deleted" }
    },
    async ({event, step}) => {
        const {id} = event.data;
        await step.run("delete-from-mongodb", async () => {
            await connectDB();
            await User.deleteOne({ clerkId: id});
        });

        await step.run("delete-from-stream", async () => {
            await deleteStreamUser(id.toString());
        });
    }
);


export const functions = [syncUser, deleteUserFromDB];
