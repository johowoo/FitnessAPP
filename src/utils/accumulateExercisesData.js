export const accumulateExercisesData = ({list, today, period}) => {
    let reps = 0, sets = 0, workouts = 0, volume = 0;
    const todayNumber = parseInt(today, 10);
    const startDateNumber = todayNumber - period;
    for (let key in list) {
        if (list.hasOwnProperty(key)) {
            if (belongToRange({startDateNumber, todayNumber, key})) {
                workouts++;
                sets += list[key].sets;
                if (list[key].weightRepsDataArr.length) {
                    list[key].weightRepsDataArr.map((item, index) => {
                        if (item.reps && item.weight) {
                            reps += item.reps;
                            volume += item.reps * item.weight;
                        }
                    })
                }
            }
        }
    }
    return {sets, reps, workouts, volume};
};

export const belongToRange = ({startDateNumber, todayNumber, key}) => {
    return key >= startDateNumber && key < startDateNumber
};
