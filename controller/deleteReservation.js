import nodeCron from "node-cron";
import ReserveVenue from "../models/reserveVenue.js";
import History from "../models/historyReserve.js";

export default function startCronFunction(){

    nodeCron.schedule("9 0 * * *", async () => {

        try {
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Start of today

            const deletedRecord = await ReserveVenue.find({date : {$lt: today}});
            await History.insertMany(deletedRecord);

            await ReserveVenue.deleteMany({ date: { $lt: today } });
            console.log("Old reservations cleared");


        } catch (err) {
            console.error("Error clearing reservations:", err);
        }
    } ,  { timezone: "Asia/Kuala_Lumpur" });
}



