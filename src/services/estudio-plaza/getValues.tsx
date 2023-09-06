import { db } from "../../config/firebase";
import { collection, getDocs, QuerySnapshot, DocumentData } from "firebase/firestore";

const Response = (response: QuerySnapshot<DocumentData, DocumentData>) =>{
    const {docs}: QuerySnapshot<DocumentData, DocumentData> = response;
    if (docs.length === 0) {
        return [];
    }
    const data = docs.map((doc) => ({data: doc.data(), id: doc.id}))
    return data[0];
}

const getValues =  async () => {
    const dataCollection = collection(db, "values");
    return getDocs(dataCollection).then(Response)
}

export default getValues;
