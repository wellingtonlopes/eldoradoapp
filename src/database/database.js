export let doctors = [
  {
      id: 1,
      name: 'Dr. Lúcio Correia dos Santos',
      specialty: 'Pediatrics'
  },
  {
      id: 2,
      name: 'Dr. Angela Ziegler',
      specialty: 'Cardiology'
  },
  {
      id: 3,
      name: 'Dr. Ana Amari',
      specialty: 'Endocrinology'
  },
  {
    id: 4,
    name: "Dr. Moira O'Deorain",
    specialty: 'Neurology'
  },
  {
    id: 5,
    name: 'Dr. Jean-Baptiste Augustin',
    specialty: 'Cardiology'
  },
  {
    id: 6,
    name: 'Dr. Brigitte Lindholm',
    specialty: 'Pediatrics'
  }
]

export const specialties = [
  {
    id: 1,
    specialty: 'Cardiology'
  },
  {
    id: 2,
    specialty: 'Endocrinology'
  },
  {
    id: 3,
    specialty: 'Neurology'
  },
  {
    id: 4,
    specialty: 'Pediatrics'
  },
  {
    id: 5,
    specialty: 'Surgery'
  }
]

export let users = [
  {
      id: 1,
      name: 'Winston Churchill',
      email: 'winston@email.com',
      password: '1234'
  },
  {
    id: 2,
    name: 'Reinhardt Wilhelm',
    email: 'rein@email.com',
    password: '1234'
}
]

export let appointments = [
{
  id: 1,
  name: 'Winston Churchill',
  doctor: 'Dr. Angela Ziegler',
  field: 'Cardiology',
  date: new Date('2020-12-17T08:00:00'),
  time: "08:00"
},
{
  id: 2,
  name: 'Winston Churchill',
  doctor: 'Dr. Ana Amari',
  field: 'Endocrinology',
  date: new Date('2020-11-21T10:00:00'),
  time: "10:00"
},
{
  id: 3,
  name: 'Reinhardt Wilhelm',
  doctor: 'Dr. Ana Amari',
  field: 'Endocrinology',
  date: new Date('2021-10-13T14:00:00'),
  time: "14:00"
},
{
  id: 4,
  name: 'Winston Churchill',
  doctor: 'Dr. Lúcio Correia dos Santos',
  field: 'Pediatrics',
  date: new Date('2021-1-30T015:00:00'),
  time: "15:00"
}
]

export let availableHours = [
  {
    id: 1,
    time: '08:00'
  },
  {
    id: 2,
    time: '09:00'
  },
  {
    id: 3,
    time: '10:00'
  },
  {
    id: 4,
    time: '11:00'
  },
  {
    id: 5,
    time: '13:00'
  },
  {
    id: 6,
    time: '14:00'
  },
  {
    id: 7,
    time: '15:00'
  },
  {
    id: 8,
    time: '16:00'
  },
  {
    id: 9,
    time: '17:00'
  },
]