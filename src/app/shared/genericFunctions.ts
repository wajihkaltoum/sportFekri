export function generateId(T: any) {
    let max = 0;
    if (T.length == 0) {
        max = 0;
    } else {
        max = T[0].id;
        for (let i = 1; i < T.length; i++) {
            if (T[i].id > max) {
                max = T[i].id;

            }
        }
    }
    return max + 1;
}