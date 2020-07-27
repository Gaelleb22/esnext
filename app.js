//let
let favoriteCityId = 'rome';
console.log(favoriteCityId);
favoriteCityId = 'paris';
console.log(favoriteCityId);

//const
const citiesId = ['paris', 'nyc', 'rome', 'rio-de-janeiro'];
console.log(citiesId);
//citiesId = [];
citiesId[4] = 'kyoto';
console.log(citiesId);

//création d'objet
function getWeather(cityId) {
    let city = cityId.toUpperCase();
    let temperature = 20;
    return { city, temperature };
}
const weather = getWeather('paris');
console.log(weather);

//Affectation destructurée
let { city, temperature } = weather;
console.log(city);
console.log(temperature);

//rest operator
let [pariId, nycID, ...othersCitiesId] = citiesId;
console.log(pariId);
console.log(nycID);
console.log(othersCitiesId.length);

//classe
class Trip {
    constructor(id, name, imageUrl) {
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
    }

    toString() {
        return `Trip [${this.id}, ${this.name}, ${this.imageUrl}, ${this._price}]`;
    }

    get price() {
        return this._price;
    }
    set price(newPrice) {
        this._price = newPrice;
    }

    static getDefaultTrip() {
        return new Trip('rio-de-janeiro', 'Rio de Janeiro', 'img/rio-de-janeiro.jpg');
    }
}
const parisTrip = new Trip('paris', 'Paris', 'img/paris.jpg');
console.log(parisTrip);
console.log(parisTrip.name);
parisTrip.price = 100;
console.log(parisTrip.toString());

const defaultTrip = Trip.getDefaultTrip();
console.log(defaultTrip.toString());

//Héritage
class FreeTrip extends Trip {
    constructor(id, name, imageUrl) {
        super(id, name, imageUrl);
        this.price = 0;
    }

    toString() {
        return 'Free' + super.toString();
    }
}

const freeTrip = new FreeTrip('nantes', 'Nantes', 'img/nantes.jpg');
console.log(freeTrip.toString());




//Promise, set, map, arrow function
class TripService {
    constructor() {
        this.tripSet = new Set();
        this.tripSet.add(new Trip('paris', 'Paris', 'img/paris.jpg'));
        this.tripSet.add(new Trip('nantes', 'Nantes', 'img/nantes.jpg'));
        this.tripSet.add(new Trip('rio-de-janeiro', 'Rio de Janeiro', 'img/rio-de-janeiro.jpg'));

    }
    findByName(tripName) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                
                const arrayTrip = Array.from(this.tripSet);
                let tripFound;
                
                arrayTrip.forEach(element => {
                    if(element.name == tripName){
                        tripFound = element;
                    }
                });
                if(tripFound == null) {
                    reject(`No trip with name ${tripName}`);
                }
                resolve(tripFound);
            }, 2000)
        });
    }
}
class PriceService {
    constructor() {
        this.priceMap = new Map();
        this.priceMap.set('paris', 100);
        this.priceMap.set('rio-de-janeiro', 800);

    }
    findPriceByTripId(tripId) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                
                if(this.priceMap.get(tripId) == null) {
                    reject(`No price for trip id ${tripId}`);
                }
                resolve(this.priceMap.get(tripId));

            }, 2000)
        });
    }
}

const tripService = new TripService();
const priceservice = new PriceService();
tripService.findByName('Paris').then(trip => console.log(`Trip Found :`, trip)).catch(err =>  console.log(err));
tripService.findByName('Toulouse').then(trip => console.log(`Trip Found :`, trip)).catch(err =>  console.log(err));
tripService.findByName('Rio de Janeiro').then(trip => { priceservice.findPriceByTripId(trip.id)
    .then(price => console.log('Price found :', price))
    .catch(err => console.log(err));
});
tripService.findByName('Nantes').then(trip => { priceservice.findPriceByTripId(trip.id)
    .then(price => console.log('Price found :', price))
    .catch(err => console.log(err));
});