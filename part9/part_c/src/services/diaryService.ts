import diaries from '../../data/entries';
import { DiaryEntry, nonSensitiveDiaryEntry, NewDiaryEntry} from '../types';


const getEntries = (): DiaryEntry[] => {
  return diaries;
};

const addDiary = (newDiary: NewDiaryEntry): DiaryEntry => {
  const newDiaryEntry: DiaryEntry = {
    id: Math.max(...diaries.map(d => d.id)) + 1,
    ...newDiary
  };
  
  diaries.push(newDiaryEntry);
  return newDiaryEntry;
};

const getNonSensitiveEntries = (): nonSensitiveDiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility
  }));
};

const findById = (id: number): DiaryEntry | undefined => {
  const entry = diaries.find(diary => diary.id === id);
  return entry;
};






export default {
  getEntries,
  addDiary,
  getNonSensitiveEntries,
  findById
};