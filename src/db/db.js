import Dexie from 'dexie';

export const db = new Dexie('voja');
db.version(1).stores({
  boards: '++id, name, description, image',
  factors: '++id, name, subjectid, topicid, boardid, progress',
  topics: '++id, name, subjectid, boardid',
  subjects: '++id, name, boardid'
});
