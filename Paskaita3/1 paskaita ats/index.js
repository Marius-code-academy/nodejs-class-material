// Casual pluginas gali ne tik miestą sugeneruoti, bet ir įvairiausius kitus parametrus. Pridedame (prie console.log), kad "Mr Petras Slekys" (bus atsitiktiniai duomenys: suffix + first name + last name).

import casual from 'casual';

console.log(casual.city, casual.integer());
console.log(`${casual.name_prefix} ${casual.first_name} ${casual.last_name}`);
