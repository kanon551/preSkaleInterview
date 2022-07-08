import { format,parseISO } from "date-fns";

const convertBackendDateToFront = (value) => {
    var date = new Date(value.replace('IST', ''));
    let day = date.getDate();
    let month = date.getMonth()+1;
    let year = date.getFullYear();
    const changeddate = month+"/"+day+"/"+year
    return changeddate;
  }

export const Library = [
    { 
        id: 1, 
        commonName: 'Fulvous Whistling Duck', 
        family: 'Rheas', 
        spotLocation: 'kansas,Turkey', 
        spotDate: '02/09/2021', 
        status: 'Least Concern', 
        scientific: 'Dendrocygna bocolor',
        image : "https://cdn.download.ams.birds.cornell.edu/api/v1/asset/162798201/1800"
    },
    { 
        id: 2, 
        commonName: 'Red Vented bulbul', 
        family: 'Bustards', 
        spotLocation: 'kansas,Turkey', 
        spotDate: format(parseISO('2014-08-18T21:11:54'), "MM/dd/yyyy"), 
        status: 'Least Concern', 
        scientific: 'Pycnonotous cafer',
        image : "https://cdn.download.ams.birds.cornell.edu/api/v1/asset/300203931/1800"
    },
    { 
        id: 3, 
        commonName: 'Red whiskered bulbul', 
        family: 'Oilbird', 
        spotLocation: 'kansas,Turkey', 
        spotDate: convertBackendDateToFront('Fri Jun 09 12:22:02 IST 1995'), 
        status: 'Critically Endangered', 
        scientific: 'Pycnonotous jacosus', 
        image : "https://cdn.download.ams.birds.cornell.edu/api/v1/asset/311377551/1800"
    },
    { 
        id: 4, 
        commonName: 'Rufous treepie', 
        family: 'Potoos', 
        spotLocation: 'kansas,Turkey', 
        spotDate: '09/18/2016', 
        status: 'Least Concern', 
        scientific: 'Dendrocitta vagabunda',
        image : "https://cdn.download.ams.birds.cornell.edu/api/v1/asset/126547471/1800" 
    },
    { 
        id: 5, 
        commonName: 'Forest owlet', 
        family: 'Megapodes', 
        spotLocation: 'kansas,Turkey', 
        spotDate: '02/11/2012', 
        status: 'Least Concern', 
        scientific: 'Athene blewitti',
        image : "https://cdn.download.ams.birds.cornell.edu/api/v1/asset/145981121/1800" 
    },
    { 
        id: 6, 
        commonName: 'Great Indian Bustard', 
        family: 'Potoos', 
        spotLocation: 'kansas,Turkey', 
        spotDate: '09/18/2016', 
        status: 'Critically Endangered', 
        scientific: 'Ardeotis nigriceps',
        image : "https://cdn.britannica.com/09/157809-050-073D23F3/Indian-bustard-bird-species.jpg" 
    },
    { 
        id: 7, 
        commonName: 'Blue cheedked bee-eat', 
        family: 'Megapodes', 
        spotLocation: 'kansas,Turkey', 
        spotDate: '01/28/2017', 
        status: 'Least Concern', 
        scientific: 'Merops supersillocus',
        image : "https://cdn.download.ams.birds.cornell.edu/api/v1/asset/140478311/1800" 
    },
    { 
        id: 8, 
        commonName: 'Purple rumped sunbird', 
        family: 'Rheas', 
        spotLocation: 'kansas,Turkey', 
        spotDate: '05/27/2015', 
        status: 'Least Concern', 
        scientific: 'Leptocoma Zylonica',
        image : "https://www.birdsofgujarat.in/site-content/uploads/purple-rumped-sunbird.jpg" 
    },
    { 
        id: 9, 
        commonName: 'owl parrot', 
        family: 'Bustards', 
        spotLocation: 'kansas,Turkey', 
        spotDate: '08/02/2019', 
        status: 'Critically Endangered', 
        scientific: 'kakapo',
        image : "https://www.motherjones.com/wp-content/uploads/2019/08/20190818-fat-parrot-2000px-2.jpg?w=990" 
    },
    { 
        id: 10, 
        commonName: 'Fruit Dove', 
        family: 'Rheas', 
        spotLocation: 'kansas,Turkey', 
        spotDate: '01/28/2017', 
        status: 'Least Concern', 
        scientific: 'Idvinious kaktune',
        image : "https://cdn.download.ams.birds.cornell.edu/api/v1/asset/261594511/1800" 
    },
    { 
        id: 11, 
        commonName: 'Hooded Grebe', 
        family: 'Oilbird', 
        spotLocation: 'kansas,Turkey', 
        spotDate: '02/09/2021', 
        status: 'Least Concern', 
        scientific: 'Trecnch Music',
        image : "https://live.staticflickr.com/4803/32170584988_9f6a3a05cf_b.jpg" 
    },
]