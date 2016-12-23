(function () {

    let app = angular.module('cfkMayTheFourth');

    app.factory('formService', FormService);

    FormService.$inject = [];

    function FormService() {
        let fs = this;

        items = {
            acceptableItems: ['Answering Machines', 'Keyboards/Mice', 'Rechargeable Batteries', 'Ballasts-non PCB', 'Household Electronics', 'Remote Controls', 'Batteries (See list below)', 'Ink/Toner',
                'Scanners', 'Cables', 'Lab Equipment', 'Stereo Components', 'Camcorders', 'Laptops', 'Stereos', 'CDs/DVDs', 'Laptop Batteries', 'Tapes', 'Cell Phones', 'LCD Monitors', 'Tape Players', 'Circuit Boards', 'Mainframe Equipment',
                'Telephones', 'Compact Disk Players', 'Media', 'Telecom Equipment', 'Computer Equipment', 'Metal Scrap', 'Radios', 'Computers', 'Microwave Ovens', 'Testing Equipment', 'Copiers', 'Modems', 'Toasters', 'Cords', 'Monitors',
                'Transparency Makers', 'Duplicators', 'Networking Equipment', 'Two-Way Radios', 'DVD Players', 'Pagers', 'UPS – Power Supplies', 'Electric Typewriters', 'PDA’s', 'VCR’s', 'Electronic Games', 'Printers', 'Word Processors', 'Fax Machines', 'Printed Circuit Board', '*Hard Drives', 'Other Electronics'],
            notAcceptable: ['Air Conditioners', 'Light Bulbs', 'Radioactive Waste', 'Broken CRT Monitors', 'Medical Waste', 'Refrigerators', 'Console Televisions', 'Nuclear Waste', 'Thermostats', 'Dishwashers', 'Paint', 'Washers',
                'Dryers', 'PCB Ballasts', 'Televisions'],
            hddNote: '*Computer For Kids sister company, Secure Erase, sanitizes or destroys the hard drives.',
        }

        function getItems() {
            return new Promise(function (resolve, reject) {
                resolve(items);
            })
        }

        return {
            getItems: getItems
        };

    };

})()

