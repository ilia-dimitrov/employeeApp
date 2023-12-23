export function logic(data) {
  const employeePairsRevisit = {};

  for (let i = 0; i < data.length; i++) {
    const emp1 = data[i][0];
    const proj1 = data[i][1];
    const dateFrom1 = new Date(data[i][2]);
    const dateTo1 = new Date(data[i][3]);

    for (let j = i + 1; j < data.length; j++) {
      const emp2 = data[j][0];
      const proj2 = data[j][1];
      const dateFrom2 = new Date(data[j][2]);
      const dateTo2 = new Date(data[j][3]);

      // Check if employees worked on the same project
      if (proj1 === proj2) {
        // Calculate the overlapping days
        const overlapDays =
          Math.min(dateTo1, dateTo2) - Math.max(dateFrom1, dateFrom2);
        if (overlapDays > 0) {
          const pairKey = `${emp1},${emp2}`;
          const projKey = `${proj1}`;

          // Initialize the object if it doesn't exist
          if (!employeePairsRevisit[pairKey]) {
            employeePairsRevisit[pairKey] = {
              pair: [emp1, emp2],
              projects: {},
              totalDays: 0,
            };
          }

          // Accumulate total days worked together for each project
          if (!employeePairsRevisit[pairKey].projects[projKey]) {
            employeePairsRevisit[pairKey].projects[projKey] = 0;
          }
          employeePairsRevisit[pairKey].projects[projKey] +=
            overlapDays / (24 * 60 * 60 * 1000);
          // Accumulate total days worked together for the pair
          employeePairsRevisit[pairKey].totalDays +=
            overlapDays / (24 * 60 * 60 * 1000);
        }
      }
    }
    // console.log(employeePairsRevisit);
  }
  return Object.entries(employeePairsRevisit);
}
