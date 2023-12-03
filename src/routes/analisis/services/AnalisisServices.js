import {invoke} from "@tauri-apps/api/tauri";

export const getEventTypes = async () => {
    try{
        return await invoke("get_all_event_types");
    }catch (e){
        return e;
    }
}

export const getAllFinancialEvents = async () => {
    try {
        return await invoke("get_all_records")
    } catch (e) {
        return e;
    }
}


export const getFinancialEventsByDate = async (month,year) => {
    try{
        return await invoke("get_records_by_date",{
            month,
            year
        });
    }catch(e){
        return e;
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