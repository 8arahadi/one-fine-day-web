angular.module('starter.services', [])

.value('PARSE_CREDENTIALS',{
	APP_ID: 'xhTpJiNedJ7mmDj3LTTBUePqSVegcJHzEbh70Y0Q',
	REST_API_KEY:'XCfQDPODgNB1HqmaCQgKLPWGxQ0lCUxqffzzURJY'
})

.value('BACKEND',{
	URL: 'http://ibm-ofd-backend.mybluemix.net/api'
	//URL: 'http://blue.life2play.net:3000/api'
})

.service('LoginService', function($http,PARSE_CREDENTIALS,BACKEND,$q){
	return{
		loginUser: function(id){
			var deferred = $q.defer();
			var promise = deferred.promise;

			var gabungan = ['010974','010702','011166','010360','004395','010588','011207','010723','011167','010748','010727','010411','010792','010706','010645','010786','011116','011038','011184','010226','011023','011049','010676','011124','010837','011117','011136','010497','003730','011174','011147','010853','011012','010870','010386','011126','011195','004123','010789','010561','011130','011173','010986','011146','011091','011042','011176','011099','011093','011112','011183','010914','010431','010348','011151','010959','010398','010971','010716','010943','010793','011131','010719','011145','010692','011133','011051','011153','011118','011095','010492','011107','011092','010766','011106','010919','011108','011022','011187','010738','011085','011084','010667','010771','011056','004219','010644','011102','010848','011120','010045','010841','010884','011144','010795','010439','011135','011115','010810','011086','011177','011053','010522','011129','011127','010755','011031','011119','011155','011137','010609','010479','011205','010802','011143','010717','010946','011192','011044','011109','011196','010908','011114','004195','010651','010987','011138','010875','010896','010133','011094','010704','011163','010999','011203','010863','011028','011134','010855','010696','010893','011214','010486','010259','010493','011054','010659','010316','010570','011213','004229','010602','011164','011188','010776','011073','011199','010928','011178','011036','010574','010708','010980','010994','010244','004539','010969','010972','010791','010583','010963','011190','010494','010517','010883','011100','011194','011152','010823','010337','010930','010175','010843','010852','010819','011081','010472','010796','011003','010067','010543','010374','010049','011181','011191','011149','010424','010759','004369','011198','010767','011103','010511','011211','010785','011217','003897','010405','011021','010464','003979','010806','010126','011216','011001','011101','011113','011193','010983','011202','010779','011197','011140','011075','011201','010683','004143','011077','010770','010483','011000','010144','010715','010628','011159','011175','010777','010984','004457','010849','011079','010623','010881','010989','004095','011200','010931','011168','010868','010223','011009','010904','010799','010455','011074','011121','010761','010826','010800','010237','010307','010048','011182','011017','010618','011180','011018','010917','010402','010817','010678','011057','010701','010951','011045','010902','010992','011046','011067','011210','010877','011008','011025','011160','011156','003610','011212','011064','010995','011158','010961','011080','010925','010787','010886','010239','011125','010354','011157','011142','011215','010621','010306','010753','011170','010536','011209','011186','011148','010895','010372','011172','010487','010050','010742','003745','011132','011097','010998','010932','011150','011171','010993','010933','010735','010663','011185','011034','010954','010956','010960','010134','010833','011165','004501','010054','010489','011206','010927','004477','010571','010305','010380','010734','010942','010512','004265','011076','010758','010598','010935','010643','010967','010473','010754','004525','010075','010898','011013','011090','010412','010378','010435','004203','004319','010830','010788','010097','011208','011014','010827','011154','010815','004175','010556','010668','011083','011007','010916','011204','010261','011104','011123','010768','004325','010976','011179','010540','011189','010710','010010','011043','010712','010880','011040','010765','30001','30004','30008','30010','30011','30016','30018','30022','30024','30025','30035','30037','30039','30040','30041','30042','30047','30048','30056','30057','30058','30060','30062','30063','30066','30067','30069','30073','30075','30077','30079','30080','30082','30085','30086','30088','30090','30093','30096','30103','30108','30112','30115','30120','30128','30134','30135','30145','30155','30168','30172','30185','30188','30189','30191','30194','30197','30198','30206','30229','30230','30231','30237','30238','30243','30248','30251','30252','30260','30261','30263','30264','30269','30270','30272','30273','30274','30275','30276','30278','30279','30282','30284','30285','30290','30293','30295','30296','30305','30307','30308','30310','30311','30313','30314','30315','30316','30318','30319','30324','30325','30327','30330','30331','30332','30333','30334','30335','30338','30341','30342','30343','30345','30346','30348','30349','30350','30351','30352','30353','30355','30356','30357','30358','30361','30362','30363','30364','30366','30367','30368','30369','30370','30371','30372','30374','30375','30376','30377','30378','30379','30380','30381','30382','30383','30384','30385','30386','30388','30389','30390','30391','30392','30393','30394','30395','30396','30397','30398','30399','30400','30401','30402','30403','30404','30405','30406','30407','30408','30409','30410','30413','30414','900999','901082','901127','901140','901172','901176','901177','901179','901181','901182','901183','901185','901189','901198','901200','901201','901202','901203','901210','901211','901232','901233','901234','901261','901266','901273','901274','901280','901298','901303','901304','901305','901318','901319','901329','901330','901331','901333','901334','901335','901342','901343','901360','901362','901363','901369','901371','901372','901374','901376','901382','901383','901388','901389','901390','901391','901392','901398','901403','901404','901405','901406','901407','901408','901410','901412','901413','901416','901422','901423','901425','901427','901428','901431','901432','901435','901438','901439','901441','901443','901444','901445','901450','901454','901458','901460','901461','901462','901463','901464','901465','901466','901467','901468','901469','901470','901471','901473','901474','901476','901477','901478','901479','901480','901481','901482','901484','901486','901488','901489','901491','901492','901493','901494','901495','901496','901498','901499','901500','901501','901502','901503','901504','901505','901506','901507','901508','901510','901512','901513','901514','901515','901516','901517','901518','901519','901520','901521','901522','901523','901524','901525','901526','901527','901529','901530','901531','901533','901534','901535','901536','901537','901538','901539','901542','901543','901545','901546','901547','901548','901549','901550','901551','901552','901553','901554','901555','901556','901557','901558','901559','901560','901561','901562','901563','901564','901565','901566','901567','901568','901569','901570','901571','901572','901573','901574','901575','901576','901577','901578','901579','901580','901581','901582','901583','901584','901585','901586','901588','901590','901591','901592','901593','901594','901595','901596','901597','901598','901599','901601','901602','901603','901604','901605','901606','901607','901608','901609','901610','901611','901612','901613','901614','901615','901616','901617','901618','901619','901620','901621','901622','901623','901624','901625','901626','901627','901628','901629','901630','901631','901632','901633','901634','901636','901637','901638','901639','901640','901641','901642','901643','901644','901646','901647','901648','901650','901651','901652'];
			// var data = "userEmail="+name+"&userPassword="+pw;
			
			// $http.post(BACKEND.URL+'/customers/loginUser',data,
			// 	{ headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
			// 	).success(function(response){
			// 	//console.log('s'+response);
			// 	deferred.resolve(response);
			// }).error(function(response,error){
			// 	if(error == 500){
			// 		deferred.reject('Periksa kembali email dan password anda.');
			// 	}else{
			// 		deferred.reject('Harap coba kembali beberapa saat lagi.');
			// 	}
			// });
			var nemu = false;
			for(var i=0;i<gabungan.length;i++){
				if((id == gabungan[i])){
					nemu = true;
					break;
				}else{
					nemu = false;
				}
			}
			if(nemu){
				deferred.resolve(true);
			}
			else{
				deferred.reject(false);
			}
			
			
			promise.success = function(fn){
				promise.then(fn);
				return promise;
			}
			
			promise.error = function(fn){
				promise.then(null, fn);
				return promise;
			}
			
			return promise;
		}
	}
})

.service('PhotoService', function($http,PARSE_CREDENTIALS,BACKEND,$q){
	return{
		getStream: function(id) {
			var deferred = $q.defer();
			var promise = deferred.promise;
			$http.get(BACKEND.URL+'/twitters/searchHastag?query='+id).success(function(response){
				deferred.resolve(response);
			}).error(function(response){
				deferred.reject(response);
			});
			promise.success = function(fn){
				promise.then(fn);
				return promise;
			}
			promise.error = function(fn){
				promise.then(null, fn);
				return promise;
			}
			return promise;
		}
	}
})
.service('TimelineService', function($http,PARSE_CREDENTIALS,BACKEND,$q){
	return{
		getQuestion: function() {
			var deferred = $q.defer();
			var promise = deferred.promise;
			$http.get(BACKEND.URL+'/questions').success(function(response){
				deferred.resolve(response);
			}).error(function(response){
				deferred.reject(response);
			});
			promise.success = function(fn){
				promise.then(fn);
				return promise;
			}
			promise.error = function(fn){
				promise.then(null, fn);
				return promise;
			}
			return promise;
		}
	}
})

.factory('Histories', function($http,PARSE_CREDENTIALS,BACKEND,$q) {
	return {
		all: function() {
			return histories;
		},
		remove: function(history) {
			histories.splice(histories.indexOf(history), 1);
		},
		get: function(id) {
			var deferred = $q.defer();
			var promise = deferred.promise;
			$http.get(BACKEND.URL+'/customers/'+id+'/tripHistories').success(function(response){
				//console.log('s'+response);
				deferred.resolve(response);
			}).error(function(response){
				deferred.reject('ERROR trip history list cannot connect to API');
			});
			
			promise.success = function(fn){
				promise.then(fn);
				return promise;
			}
			promise.error = function(fn){
				promise.then(null, fn);
				return promise;
			}
			return promise;
		},
		getTrip:function(tripId) {
			var deferred = $q.defer();
			var promise = deferred.promise;
			$http.get(BACKEND.URL+'/trip_histories/'+tripId).success(function(response){
				deferred.resolve(response);
			}).error(function(response){
				deferred.reject('ERROR trip history detail cannot connect to API');
			});
			promise.success = function(fn){
				promise.then(fn);
				return promise;
			}
			promise.error = function(fn){
				promise.then(null, fn);
				return promise;
			}
			return promise;
		}
	};
})

.factory('SideMenu', function($http,PARSE_CREDENTIALS,BACKEND,$q) {
	return {
		getProfile: function(id) {
			var deferred = $q.defer();
			var promise = deferred.promise;
			$http.get(BACKEND.URL+'/customers/'+id).success(function(response){
				//console.log('s'+response);
				deferred.resolve(response);
			}).error(function(response){
				deferred.reject('ERROR trip history list cannot connect to API');
			});
			
			promise.success = function(fn){
				promise.then(fn);
				return promise;
			}
			promise.error = function(fn){
				promise.then(null, fn);
				return promise;
			}
			return promise;
		}
	};
})


.factory('Customer', function($http,PARSE_CREDENTIALS,BACKEND,$q){
	return {	
		getAll: function(){
			var deferred = $q.defer();
			var promise = deferred.promise;
			$http.get(BACKEND.URL+'/customers/').success(function(response){
				//console.log('s'+response);
				deferred.resolve(response);
			}).error(function(response){
				deferred.reject('ERROR euy');
			});
			
			promise.success = function(fn){
				promise.then(fn);
				return promise;
			}
			promise.error = function(fn){
				promise.then(null, fn);
				return promise;
			}
			
			return promise;
		},
		get: function(id){
			var deferred = $q.defer();
			var promise = deferred.promise;
			
			$http.get(BACKEND.URL+'/customers/'+id).success(function(response){
				//console.log('s'+response);
				deferred.resolve(response);
			}).error(function(response){
				deferred.reject('ERROR euy');
			});
			
			promise.success = function(fn){
				promise.then(fn);
				return promise;
			}
			promise.error = function(fn){
				promise.then(null, fn);
				return promise;
			}
			
			return promise;
		},
		getName: function(id){
			var deferred = $q.defer();
			var promise = deferred.promise;
			
			$http.get(BACKEND.URL+'/customers/'+id+'?filter=%7B%22fields%22%3A%20%7B%22name%22%3A%20true%2C%20%22phone_number%22%3A%20true%7D%7D').success(function(response){
				//console.log('s'+response);
				deferred.resolve(response);
			}).error(function(response){
				deferred.reject('ERROR euy');
			});
			
			promise.success = function(fn){
				promise.then(fn);
				return promise;
			}
			promise.error = function(fn){
				promise.then(null, fn);
				return promise;
			}
			
			return promise;
		}
	};
})

.factory('TripAndReservation', function($http,PARSE_CREDENTIALS,BACKEND,$q){
	return {
		getTripStatusById:function(tripId){
			var deferred = $q.defer();
			var promise = deferred.promise;
			
			$http.get(BACKEND.URL+'/trip_histories/'+tripId+'?filter=%7B%22fields%22%3A%7B%22trip_status%22%3Atrue%7D%7D').success(function(response){
				deferred.resolve(response);
			}).error(function(response){
				deferred.reject('ERROR euy');
			});
			
			promise.success = function(fn){
				promise.then(fn);
				return promise;
			}
			promise.error = function(fn){
				promise.then(null, fn);
				return promise;
			}
			
			return promise;
		},
		checkIsToAirport:function(lat,lng){
			var deferred = $q.defer();
			var promise = deferred.promise;
			$http.get(BACKEND.URL+'/trip_histories/checkInsideAirport?lat='+lat+'&lng='+lng).success(function(response){
				deferred.resolve(response);
			}).error(function(response){
				deferred.reject('Fail to check is to airport');
			});
			
			promise.success = function(fn){
				promise.then(fn);
				return promise;
			}
			promise.error = function(fn){
				promise.then(null, fn);
				return promise;
			}
			
			return promise;
		},
		getTripById:function(tripId){
			var deferred = $q.defer();
			var promise = deferred.promise;
			
			$http.get(BACKEND.URL+'/trip_histories/'+tripId).success(function(response){
				deferred.resolve(response);
			}).error(function(response){
				deferred.reject('ERROR euy');
			});
			
			promise.success = function(fn){
				promise.then(fn);
				return promise;
			}
			promise.error = function(fn){
				promise.then(null, fn);
				return promise;
			}
			
			return promise;
		},
		createReservation:function(data){
			var deferred = $q.defer();
			var promise = deferred.promise;
			
			$http.post(BACKEND.URL+'/trip_histories/raiseReservation',data).success(function(response){
				//console.log('s - '+response);
				deferred.resolve(response);
			}).error(function(response){
				deferred.reject('ERROR euy');
			});
			
			promise.success = function(fn){
				promise.then(fn);
				return promise;
			}
			promise.error = function(fn){
				promise.then(null, fn);
				return promise;
			}
			
			return promise;
		},
		cancelReservation:function(tripId){
			var deferred = $q.defer();
			var promise = deferred.promise;
			
			$http.put(BACKEND.URL+'/trip_histories/cancelReservation?id='+tripId).success(function(response){
				if(response.cancelReservation == "Success"){
					deferred.resolve(response);
				}else{
					deferred.reject('Failed');
				}
			}).error(function(response){
				deferred.reject('ERROR response');
			});
			
			promise.success = function(fn){
				promise.then(fn);
				return promise;
			}
			promise.error = function(fn){
				promise.then(null, fn);
				return promise;
			}
			
			return promise;
		},
		changeDestination:function(tripId, destinationName, geo_lat, geo_long){
			var deferred = $q.defer();
			var promise = deferred.promise;

			$http.put(BACKEND.URL+'/trip_histories/changeDestination?id_trip='+tripId+
				'&destination_name='+destinationName+'&destination_geo_lat='+geo_lat+
				'&destination_geo_long='+geo_long).success(function(response){
					if(response.Status == "Success"){
						deferred.resolve(response);
					}else{
						deferred.reject('Failed');
					}
				}).error(function(response){
					deferred.reject('ERROR response');
				});

				promise.success = function(fn){
					promise.then(fn);
					return promise;
				}
				promise.error = function(fn){
					promise.then(null, fn);
					return promise;
				}

				return promise;
			},
			closeNonCash:function(tripId,usedPoint,totalPoint){
				var deferred = $q.defer();
				var promise = deferred.promise;
				$http.put(BACKEND.URL+'/trip_histories/closeNonCash?trip%20id='+tripId+'&useLoyaltyPoint='+usedPoint+'&loyaltyPoint='+totalPoint).success(function(response){
					deferred.resolve(response);

				}).error(function(response){
					deferred.reject('ERROR response');
				});

				promise.success = function(fn){
					promise.then(fn);
					return promise;
				}
				promise.error = function(fn){
					promise.then(null, fn);
					return promise;
				}

				return promise;
			},
			closeCash:function(tripId,usedPoint,totalPoint){
				var deferred = $q.defer();
				var promise = deferred.promise;
				$http.put(BACKEND.URL+'/trip_histories/closeCash?trip%20id='+tripId+'&useLoyaltyPoint='+usedPoint+'&loyaltyPoint='+totalPoint).success(function(response){
					deferred.resolve(response);

				}).error(function(response){
					deferred.reject('ERROR response');
				});

				promise.success = function(fn){
					promise.then(fn);
					return promise;
				}
				promise.error = function(fn){
					promise.then(null, fn);
					return promise;
				}

				return promise;
			},
			giveTip:function(tripId,tip){
				var deferred = $q.defer();
				var promise = deferred.promise;
				$http.put(BACKEND.URL+'/trip_histories/giveTip?id='+tripId+'&tip='+tip).success(function(response){
					deferred.resolve(response);

				}).error(function(response){
					deferred.reject('ERROR response');
				});

				promise.success = function(fn){
					promise.then(fn);
					return promise;
				}
				promise.error = function(fn){
					promise.then(null, fn);
					return promise;
				}

				return promise;
			},
			giveComment:function(tripId, star, comment){
				var deferred = $q.defer();
				var promise = deferred.promise;
				$http.put(BACKEND.URL+'/trip_histories/giveCommentDriver?trip_id='+tripId+'&number_of_star='+star+'&comments='+comment).success(function(response){
					deferred.resolve("Success");
				}).error(function(response){
					deferred.reject('ERROR euy');
				});

				promise.success = function(fn){
					promise.then(fn);
					return promise;
				}
				promise.error = function(fn){
					promise.then(null, fn);
					return promise;
				}

				return promise;
			}
		};
	})

.factory('Taxi', function($http,PARSE_CREDENTIALS,BACKEND,$q){
	return {
		getTaxiLocationById:function(hullNumber){
			var deferred = $q.defer();
			var promise = deferred.promise;
			
			$http.get(BACKEND.URL+'/cars/'+hullNumber+'?filter=%7B%22fields%22%3A%7B%22last_geo_position%22%3Atrue%7D%7D').success(function(response){
				deferred.resolve(response);
			}).error(function(response){
				deferred.reject('ERROR euy');
			});
			
			promise.success = function(fn){
				promise.then(fn);
				return promise;
			}
			promise.error = function(fn){
				promise.then(null, fn);
				return promise;
			}
			
			return promise;
		},
		getNearestTaxiLocation:function(lat,lng){
			var deferred = $q.defer();
			var promise = deferred.promise;
			
			$http.get(BACKEND.URL+'/trip_histories/findNearestCar?lat='+lat+'&lng='+lng).success(function(response){
				deferred.resolve(response);
			}).error(function(response){
				deferred.reject(response);
			});
			promise.success = function(fn){
				promise.then(fn);
				return promise;
			}
			promise.error = function(fn){
				promise.then(null, fn);
				return promise;
			}
			return promise;
		}
	};
})

.factory('Driver', function($http,PARSE_CREDENTIALS,BACKEND,$q){
	return {
		getDriverById:function(driverId){
			var deferred = $q.defer();
			var promise = deferred.promise;
			
			$http.get(BACKEND.URL+'/drivers/'+driverId+'?filter=%7B%22fields%22%3A%7B%22id_driver%22%3Atrue%2C%22name%22%3Atrue%2C%22rating%22%3Atrue%7D%7D').success(function(response){
				deferred.resolve(response);
			}).error(function(response){
				deferred.reject('ERROR euy');
			});
			
			promise.success = function(fn){
				promise.then(fn);
				return promise;
			}
			promise.error = function(fn){
				promise.then(null, fn);
				return promise;
			}
			
			return promise;
		},
		
		giveComment:function(driverId, email, date, tripId, star, comment){
			var deferred = $q.defer();
			var promise = deferred.promise;
			
			/*$http.put(BACKEND.URL+'/drivers/giveComment?id_driver='+driverId+'&email='+email+'&date_start='+date+'&id_trip='+tripId+'&number_of_star='+star+'&comments='+comment).success(function(response){
				deferred.resolve(response);
			}).error(function(response){
				deferred.reject('ERROR euy');
			});
			
			promise.success = function(fn){
				promise.then(fn);
				return promise;
			}
			promise.error = function(fn){
				promise.then(null, fn);
				return promise;
			}*/
			
			return promise;
		}
	};
})

/*.factory('Customer', function() {
	
	//dummy
	var profile = [
		{
			customerId: 1,
			email: 'leo.caprio@gmail.com',
			photo: 'img/leonardo_dicaprio.jpg',
			nama: 'Leonardo Dicaprio',
			//l_name: 'Dicaprio',
			alamat: '08123456789'
		}
	];
	
	return {
		get: function(customerId) {
			for (var i = 0; i < profile.length; i++) {
				if (profile[i].customerId === parseInt(customerId)) {
					return profile[i];
				}
			}
			return null;
		}
	};
})*/

.factory('Wallets', function($http,PARSE_CREDENTIALS,BACKEND,$q) {
	return {
		get: function(id) {
			var deferred = $q.defer();
			var promise = deferred.promise;
			$http.get(BACKEND.URL+'/customers/showPaymentMethod?customerEmail='+id).success(function(response){
				deferred.resolve(response);
			}).error(function(response){
				deferred.reject('ERROR get wallets cannot connect to API');
			});
			promise.success = function(fn){
				promise.then(fn);
				return promise;
			}
			promise.error = function(fn){
				promise.then(null, fn);
				return promise;
			}
			return promise;
		},
		create:function(email,name,type,cnumber,cexpiry,ccv){
			var deferred = $q.defer();
			var promise = deferred.promise;
			$http.put(BACKEND.URL+'/customers/createPaymentMethod?Customer%20Email='+email+'&Payment%20Name='+name+'&Payment%20Type='+type+'&Card%20Number='+cnumber+'&Card%20Expiry='+cexpiry+'&Card%20CCV='+ccv).success(function(response){
				deferred.resolve(response);
			}).error(function(response){
				console.log(response);
				deferred.reject('ERROR create wallets cannot connect to API');
			});
			
			promise.success = function(fn){
				promise.then(fn);
				return promise;
			}
			promise.error = function(fn){
				promise.then(null, fn);
				return promise;
			}	
			return promise;
		},		
	}
})

.factory('LoyaltyPoint', function($http,PARSE_CREDENTIALS,BACKEND,$q) {
	return {
		get: function(id) {
			var deferred = $q.defer();
			var promise = deferred.promise;
			$http.get(BACKEND.URL+'/customers/displayLoyaltyPoint?email_costumer='+id).success(function(response){
				deferred.resolve(response);
			}).error(function(response){
				deferred.reject('ERROR get loyalty point cannot connect to API');
			});
			promise.success = function(fn){
				promise.then(fn);
				return promise;
			}
			promise.error = function(fn){
				promise.then(null, fn);
				return promise;
			}
			return promise;
		},
		add:function(email,point){
			var deferred = $q.defer();
			var promise = deferred.promise;
			$http.put(BACKEND.URL+'/customers/addLoyaltyPoint?email_customer='+email+'&point='+point).success(function(response){
				deferred.resolve(response);
			}).error(function(response){
				console.log(response);
				deferred.reject('ERROR create loyalty point cannot connect to API');
			});
			
			promise.success = function(fn){
				promise.then(fn);
				return promise;
			}
			promise.error = function(fn){
				promise.then(null, fn);
				return promise;
			}	
			return promise;
		},		
	}
})

.factory('PanicButton', function($http,PARSE_CREDENTIALS,BACKEND,$q) {
	return {
		report:function(email,id_trip,lat,lng){
			var deferred = $q.defer();
			var promise = deferred.promise;
			http://pw-bbg-backend.mybluemix.net/api/
			$http.put(BACKEND.URL+'/panic_histories/reportCustomer?email='+email+'&id_trip='+id_trip+'&lat='+lat+'&lng='+lng).success(function(response){
				deferred.resolve(response);
			}).error(function(response){
				console.log(response);
				deferred.reject('ERROR panic button cannot connect to API');
			});
			
			promise.success = function(fn){
				promise.then(fn);
				return promise;
			}
			promise.error = function(fn){
				promise.then(null, fn);
				return promise;
			}	
			return promise;
		},		
	}
})

.factory('FavLocations', function($http,PARSE_CREDENTIALS,BACKEND,$q) {
	return {
		get: function(id) {
			var deferred = $q.defer();
			var promise = deferred.promise;
			$http.get(BACKEND.URL+'/customers/getFavouritePOI?userEmail='+id).success(function(response){
				//console.log('s'+response);
				deferred.resolve(response);
			}).error(function(response){
				deferred.reject('ERROR fav poi list cannot connect to API');
			});
			
			promise.success = function(fn){
				promise.then(fn);
				return promise;
			}
			promise.error = function(fn){
				promise.then(null, fn);
				return promise;
			}
			return promise;
		},
		getDetail:function(locId) {
			var deferred = $q.defer();
			var promise = deferred.promise;
			$http.get(BACKEND.URL+'/customers/getFavouritePOI?userEmail='+locId).success(function(response){
				deferred.resolve(response);
			}).error(function(response){
				deferred.reject('ERROR trip history detail cannot connect to API');
			});
			promise.success = function(fn){
				promise.then(fn);
				return promise;
			}
			promise.error = function(fn){
				promise.then(null, fn);
				return promise;
			}
			return promise;
		},
		save:function(data) {
			var deferred = $q.defer();
			var promise = deferred.promise;
			$http.put(BACKEND.URL+'/customers/saveFavouritePOI',data).success(function(response){
				deferred.resolve(response);
			}).error(function(response){
				deferred.reject('ERROR create wallets cannot connect to API');
			});
			
			promise.success = function(fn){
				promise.then(fn);
				return promise;
			}
			promise.error = function(fn){
				promise.then(null, fn);
				return promise;
			}	
			return promise;

		}
	}
});