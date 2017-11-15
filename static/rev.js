$(document).ready(function(){


  // $('input:radio').on('change',function(){
  // 	console.log($(this))
  //   if ($(this).is(':checked')) {
  //   	var target = $(this).attr('target');
  //   	$('.'+target).css('display', 'block')
  //   	$('.'+target +' .question:not(.hidden)').css('display', 'block')
  //   }
  // });


  // $('.q2_4').click(function(){
  //   if ($(this).is(':checked')) {
  //   	var target = $(this).attr('target');
  //   	$('.'+target).css('display', 'block')
  //   }
  // });



  // $('button').click(function(){
  //   	var target = $(this).attr('target');
  //   	console.log(target)
  //   	$('.'+target).css('display', 'block')
  // });

  function calcSalIt(params) {

      }

      function calcSalNone(params) {

      }

      function calcSalAngajatorScutiri(params) {

      }

      function calcSalAngajatorNonScutiri(params) {

      }

      var ViewModel = function() {
        this.angajat = ko.observable();
        this.bugetarAngajat = ko.observable(false);
        this.bugetarAngajator = ko.observable(false);
        // this.privat = ko.observable(false);
        this.transfer = ko.observable(false);
        this.salariu = ko.observable();
        this.salariuCalculat = ko.observable();
        this.reducere = ko.observable();
        this.angajatiScutiti = ko.observable(false);
        this.sumaTotalaScutiti = ko.observable();
        this.sumaTotalaScutitiCalc = ko.observable();
        this.domeniuSelected = ko.observable();

      //   this.domeniu = [
      //     {text: 'Lucrez in IT', value: "it"},
      //     {text: 'Lucrez in cercetare și dezvoltare', value: "cercetare"},
      //     {text: 'Lucrez in industria HoReCa (hoteluri, restaurante, cafenele)', value: "horeca"},
      //     {text: 'Beneficiez de reducerea impozitului din cauza unui handicap', value: "handicapat"},
      //     {text: 'Niciuna din cele de mai sus', value: "niciuna"}
      // ]

        this.calcSalariu = function calcSalariu() {
          console.log('calcSalariu', this)
        }

        this.calcReducereSalariu = function calcReducereSalariu() {
          console.log('calcReducereSalariu', this)
        }
        this.calcSumaTotalaScutiti = function calcSumaTotalaScutiti() {
          console.log('calcSumaTotalaScutiti', this)
        }
        this.calcReducereSumaTotalaScutiti = function calcReducereSumaTotalaScutiti() {
          console.log('calcReducereSumaTotalaScutiti', this)
        }
      };

      ko.applyBindings(new ViewModel());
})
