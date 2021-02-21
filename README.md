# react-roommates-nextdoor

[Brainstorming doc](https://docs.google.com/document/d/1K3vOfS0cWp-fCUPLk7bPFyV6mG-FZxe4IdsRv_nAPJA/edit?usp=sharing)

## How to run the development servers
cd into server/ from root in your terminal and execute "npm run dev". This will run the react frontend server and backend api concurrently, with requests from react being proxied to localhost:5000 (dev server). because I'm using a package called "concurrently" you don't need to start up the react server manually by doing npm start.

## How to Pull Data from the API:

The API is structured with 3 main endpoints responding to GET requests, described below. To hit the endpoint in react, use this statement:
```

const getData = async () => {
  const {data} = await axios.get('/api/ENDPOINT') 
  // from here, save data to state, etc
}

// this arrow function getData can also be put in a useEffect call
useEffect(() => {
  getData()
}, [])

```
* /api/posts returns JSON object that describes posts
```
{
    title: 'A New Room Opening at 123 South St',
    description:
      'Looking for a fun open minded roommate to fill the room at 123 South St. Parking spot included, but no pets allowed, sorry!',
    location: {
      street: '123 South Street',
      city: 'Washington',
      state: 'District of Columbia',
    },
    // posible types = house, apartment
    housingType: 'house',
    amenities: {
      privateBath: true,
      roomFurnished: false,
      parkingIncluded: true,
      washerDryerInUnit: true,
      petsAllowed: false,
      wifi: true,
      cableTv: false,
      kitchen: true,
      poolAccess: false,
      accepts420: false,
    },
    likes: [{ id: '123456' }, { id: '456123' }, { id: '789789' }],
    _user: {
      id: '123456',
    },
    _postedInArea: 'Washington, DC',
  },
```
* /api/areas returns JSON objects that describe geographic areas. This will be used by users to set their location, and will be used to index posts to specific locations
```
{
    areaId: '111222',
    cityName: 'Washington',
    stateProvinceName: 'District of Columbia',
  },
```
* /api/users returns JSON objects describing users
```
{
    id: '123456',
    userName: 'jimmy123',
    firstName: 'Jim',
    lastName: 'Halpert',
    email: 'jHalpert@dunderMifflin.com',
    _areaId: '111222',
  },
```

## Wireframes 

Design and UI for web app

Login UI             |  User Profile / Settings UI
:-------------------------:|:-------------------------:
![](https://i.imgur.com/LHZl3QB.png)  |  ![](https://i.imgur.com/be3M0uO.png)
| ![](https://i.imgur.com/amQgdWh.png) 

Post Feed (Web View)
![](https://imgur.com/ovRuLZM.png)

Post Feed (Mobile)
![](https://imgur.com/vnJLdFt.png)

Post Feed with Open Item
![](https://imgur.com/Ht1M3ER.png)
