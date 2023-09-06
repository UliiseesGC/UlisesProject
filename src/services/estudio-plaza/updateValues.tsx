import { db } from '../../config/firebase';
import { updateDoc, doc } from "firebase/firestore";

const updateValues = (obj: {}, path: string, id: string) => {
    const valuesDoc = doc(db, path, id);
    return updateDoc(valuesDoc, obj);
};

export default updateValues;