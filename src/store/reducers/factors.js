import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../db/db";

 const reducers = {

};

const generalReducers = {
    generalAddReducer: async (tableName, newItemDetails) => {
        //this is a general function used to add factors, topics and subjects
    
        //now first add the factor to db, and recieve the id
        let id = await db[tableName].add(newItemDetails);
        //now return this item
        return {
            id,
            ...newItemDetails
        }
    },

    generalSyncReducer: async (tableName, itemsToSyncFrom) => {
        //this one has is used when the app first loads, or when onboarding is completed.
        //it syncs the local state and sometimes even the DB with upstream data
        if (itemsToSyncFrom) {
            await db[tableName].bulkAdd(itemsToSyncFrom)
        };
    
        return await db[tableName].toArray()
    },

    generalEditReducer: async (tableName, edits) => {
        const { id } = edits
        await db[tableName].update(id, edits);
        return await db[tableName].toArray()
    },

    generalBulkDeleter: async (topicid, subjectid, removeType) => {
        //this one is used when the parent is getting deleted and you want to prevent data getting orphaned
        // removeType = factors | topics
        const selectBy = topicid ? 'topicid' : 'subjectid';
        const idToConsider = topicid ? topicid : subjectid
        let ids = []
        if (removeType === 'factors') {
            //delete all the factors which fulfill the selectby
            ids = await db.factors
                .where(selectBy).equals(idToConsider) // Condition
                .toArray() // Fetch all matching rows
                .then(rows => rows.map(row => row.id)); // Extract IDs
            await db.factors.bulkDelete(ids)
        } else {
            ids = await db.topics
                .where(selectBy).equals(idToConsider) // Condition
                .toArray() // Fetch all matching rows
                .then(rows => rows.map(row => row.id)); // Extract IDs
            await db.topics.bulkDelete(ids)
        }
    }
}

const {generalAddReducer, generalBulkDeleter, generalEditReducer, generalSyncReducer} = generalReducers


 const asyncThunks = {
    createNewFactor: createAsyncThunk(
        'factors/newFactor',
        async (details) => {
            const { progress = 0, ...restDetails } = details;
        return await generalAddReducer('factors', { ...restDetails, progress });
        }

    ),

    createNewSubject: createAsyncThunk(
        'factors/newSubject',
        async (details) => (await generalAddReducer('subjects', details))

   

    ),

    createNewTopic: createAsyncThunk(
        'factors/newTopic',
        async (details) => (await generalAddReducer('topics', details))

    ),

    syncFactors: createAsyncThunk(
        'factors/syncFactors',
        async (factors) => (await generalSyncReducer('factors', factors))
    ),

    syncTopics: createAsyncThunk(
        'factors/syncTopics',
        async (topics) => (await generalSyncReducer('topics', topics))
    ),

    syncSubjects: createAsyncThunk(
        'factors/syncSubjects',
        async (subjects) => (await generalSyncReducer('subjects', subjects))
    ),

    editFactor: createAsyncThunk(
        'factors/editFactor',
        async (edits) => {
            let { progressAmount, progress, ...otheredits } = edits
            //prevent overflow of progress
            const newProgress = Math.max(0, Math.min(100, (progress || 0) + progressAmount));
            return await generalEditReducer('factors', { ...otheredits, progress: newProgress })
        }
    ),

    editSubjects: createAsyncThunk(
        'factors/editSubjects',
        async (edits) => (await generalEditReducer('subjects', edits))
    ),

    editTopics: createAsyncThunk(
        'factors/editTopics',
        async (edits) => (await generalEditReducer('topics', edits))
    ),

    removeFactor: createAsyncThunk(
        'factor/removeFactor',
        async (id) => {
            await db.factors.delete(id);
            return await db.factors.toArray();
        }
    ),

    removeTopic: createAsyncThunk(
        'factor/removeTopic',
        async (id) => {
            //first order to remove the children (factors) by topicid
            await generalBulkDeleter(id, undefined, 'factors');
            await db.topics.delete(id);
            return await db.topics.toArray()

        }
    ),

    removeSubject: createAsyncThunk(
        'factor/removeSubject',
        async (id) => {
            //again, remove the children factors AND topics
            await Promise.allSettled([
                generalBulkDeleter(undefined, id, 'factors'),
                generalBulkDeleter(undefined, id, 'topics')
            ])
            //now delete the subject itself
            await db.subjects.delete(id);
            return await db.subjects.toArray()
        }
    )

}

 const extraReducers = (builder) => {
    builder
    .addCase(asyncThunks.createNewFactor.fulfilled, (state, {payload: factor}) => {
        state.factors.push(factor)
    })
    .addCase(asyncThunks.createNewSubject.fulfilled, (state, {payload: subject}) => {
        state.subjects.push(subject)
    })
    .addCase(asyncThunks.createNewTopic.fulfilled, (state, {payload: topic}) => {
        state.topics.push(topic)
    })
    .addCase(asyncThunks.syncFactors.fulfilled, (state, {payload: factors}) => {
        state.factors = factors
    })
    .addCase(asyncThunks.syncSubjects.fulfilled, (state, {payload: subjects}) => {
        state.subjects = subjects
    })
    .addCase(asyncThunks.syncTopics.fulfilled, (state, {payload: topics}) => {
        state.topics = topics
    })
    .addCase(asyncThunks.removeFactor.fulfilled, (state, {payload: factors}) => {
        state.factors = factors
    })
    .addCase(asyncThunks.removeSubject.fulfilled, (state, {payload: subjects}) => {
        state.subjects = subjects
    })
    .addCase(asyncThunks.removeTopic.fulfilled, (state, {payload: topics}) => {
        state.topics = topics
    })
    .addCase(asyncThunks.editFactor.fulfilled, (state, {payload: factors}) => {
        state.factors = factors
    })
    .addCase(asyncThunks.editSubjects.fulfilled, (state, {payload: subjects}) => {
        state.subjects = subjects
    })
    .addCase(asyncThunks.editTopics.fulfilled, (state, {payload: topics}) => {
        state.topics = topics
    })
}

export default {
    reducers,
    asyncThunks, 
    extraReducers,
    generalReducers
}