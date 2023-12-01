import {invoke} from "@tauri-apps/api/tauri";

export const getEventTypes = async () => {
    try{
        return await invoke("get_all_event_types");
    }catch (e){
        console.error(e)
    }
}

export const getAllFinancialEvents = async () => {
    try {
        return await invoke("get_all_records")
    } catch (e) {
        console.error(e);
    }
}

export const onSubmit = async (data) => {
    try{
        return await invoke("add_record", {
            ammount:Number(data.ammount.replace(/,/g, '.')),
            desc:data.desc,
            date:data.date,
            eventType: data.event_type
        });
    }catch(error){
        return error;
    }
};