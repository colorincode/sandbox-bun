import { gsap } from 'gsap';
// import.meta.dir = '';
let videoData = [
                {
                    name: "$2,020 VANS GIFT CARD",
                    date: "1/20/20",
                    contentone: "You're seeing 20/20, it's $2,020!",
                    contenttwo: "Amazing rectangular shape.",
                    contentthree: "Cha-ching!",
                    video: {
                        "@id": "day1",
                        "@class": "",
                        "@loop": "loop",
                        "@playsinline": "playsinline",
                        poster: "./assets/prize-1.webp",
                        "@data-poster": "./assets/static-tile-homepage.gif",
                        "@data-src": "./assets/DAY1.mp4",
                        "@src": "./assets/DAY1.mp4",
                    },
                    winner: "Belen Coronel",
                    deeplink:
                        "https://web.archive.org/web/20200314051506/https://www.vans.com/shop/VFLoyaltyEnrollmentDisplay?langId=-1&storeId=10153&pageName=dashboard&stl_params_hash=eyJzdGxfdGFyZ2V0Ijoib2ZmZXItNjU1In0=&utm_campaign=famuary-20&utm_medium=vans-family&utm_source=famuary_launch&source_campaign=famuary-20_vans-family_famuary_launch_famuary20-day-1&utm_term=famuary20-day-1",
                    winnercity: "Perris, CA",
                },
                {
                    name: "20 Customs Codes",
                    date: "1/21/20",
                    contentone: "Customize 20 pairs of Vans.",
                    contenttwo: "Put a photo of your face on shoes, or not.",
                    contentthree: "20 Chances to get it juuuust right.",
                    video: {
                        "@id": "day2",
                        "@class": "",
                        "@loop": "loop",
                        "@playsinline": "playsinline",
                        "@poster": "./assets/prize-12.webp",
                        "@data-poster": "./assets/static-tile-homepage.gif",
                        "@data-src": "./assets/DAY2-2.mp4",
                        "@src": "./assets/DAY2-2.mp4",
                    },
                    winner: "Troy Decker",
                    deeplink:
                        "https://web.archive.org/web/20200314051506/https://www.vans.com/shop/VFLoyaltyEnrollmentDisplay?langId=-1&storeId=10153&pageName=dashboard&stl_params_hash=eyJzdGxfdGFyZ2V0Ijoib2ZmZXItNjU3In0=&utm_campaign=famuary-20&utm_medium=vans-family&utm_source=famuary_launch&source_campaign=famuary-20_vans-family_famuary_launch_famuary20-day-2&utm_term=famuary20-day-2",
                    winnercity: "Green Bay, WI",
                },
                {
                    name: "ULTRARANGE SHOES FOR YOUR FAMILY",
                    date: "1/22/20",
                    contentone: "The perfect travel shoe.",
                    contenttwo: "Take a hike!",
                    contentthree: "Get anywhere in these suckers.",
                    video: {
                        "@id": "day3",
                        "@class": "",
                        "@loop": "loop",
                        "@playsinline": "playsinline",
                        "@poster": "./assets/prize-15.webp",
                        "@data-poster": "./assets/static-tile-homepage.gif",
                        "@data-src": "./assets/DAY3.mp4",
                        "@src": "./assets/DAY3.mp4",
                    },
                    winner: "Lakeisha Dean",
                    deeplink:
                        "https://web.archive.org/web/20200314051506/https://www.vans.com/shop/VFLoyaltyEnrollmentDisplay?langId=-1&storeId=10153&pageName=dashboard&stl_params_hash=eyJzdGxfdGFyZ2V0Ijoib2ZmZXItNjU5In0=&utm_campaign=famuary-20&utm_medium=vans-family&utm_source=famuary_launch&source_campaign=famuary-20_vans-family_famuary_launch_famuary20-day-3&utm_term=famuary20-day-3",
                    winnercity: "Dayton, OH",
                },
                {
                    name: "VANS HATS FOR A YEAR",
                    date: "1/23/20",
                    contentone: "Wear all 52 hats at once.",
                    contenttwo: "Throw some shade all year long!",
                    contentthree: "Removable for formal occasions.",
                    video: {
                        "@id": "day4",
                        "@class": "",
                        "@loop": "loop",
                        "@playsinline": "playsinline",
                        "@poster": "./assets/prize-16.webp",
                        "@data-poster": "./assets/Prize-Scramble3.gif",
                        "@data-src": "./assets/DAY4.mp4",
                        "@src": "./assets/DAY4.mp4",
                    },
                    winner: "Dylan Kovach",
                    deeplink:
                        "https://web.archive.org/web/20200314051506/https://www.vans.com/shop/VFLoyaltyMemberDisplay?langId=-1&storeId=10153&pageName=dashboard&stl_params_hash=eyJzdGxfdGFyZ2V0Ijoib2ZmZXItNjYxIn0=&utm_campaign=famuary-20&utm_medium=vans-family&utm_source=famuary_launch&source_campaign=famuary-20_vans-family_famuary_launch_famuary20-day-4&utm_term=famuary20-day-4",
                    winnercity: "Bemidji, MN",
                },
                {
                    name: '"MADE FOR YOU" CUSTOMS SHOES',
                    date: "1/24/20",
                    contentone: "A custom pair of shoes made for you!",
                    contenttwo: "A professional designer to help get it right.",
                    contentthree: "We'll make your shoe dreams come true.",
                    video: {
                        "@id": "day5",
                        "@class": "",
                        "@loop": "loop",
                        "@playsinline": "playsinline",
                        "@poster": "./assets/prize-17.webp",
                        "@data-poster": "./assets/Prize-Scramble1.gif",
                        "@data-src": "./assets/DAY5.mp4",
                        "@src": "./assets/DAY5.mp4",
                    },
                    winner: "Osmar Macias Guzman",
                    deeplink:
                        "https://web.archive.org/web/20200314051506/https://www.vans.com/shop/VFLoyaltyEnrollmentDisplay?langId=-1&storeId=10153&pageName=dashboard&stl_params_hash=eyJzdGxfdGFyZ2V0Ijoib2ZmZXItNjYzIn0=&utm_campaign=famuary-20&utm_medium=vans-family&utm_source=famuary_launch&source_campaign=famuary-20_vans-family_famuary_launch_famuary20-day-5&utm_term=famuary20-day-5",
                    winnercity: "Fontana, CA",
                },
                {
                    name: "VANS HQ TOUR WITH STEVE VAN DOREN + VANS LUGGAGE SET",
                    date: "1/25/20",
                    contentone: "Yes, THE Steve Van Doren!",
                    contenttwo: "See where all the Vans magic happens.",
                    contentthree: "Travel to Costa Mesa, CA in style.",
                    video: {
                        "@id": "day6",
                        "@class": "",
                        "@loop": "loop",
                        "@playsinline": "playsinline",
                        "@poster": "./assets/prize-4.webp",
                        "@data-poster": "./assets/static-tile-homepage.gif",
                        "@data-src": "./assets/DAY6.mp4",
                        "@src": "./assets/DAY6.mp4",
                    },
                    winner: "Tristan Calhoun",
                    deeplink:
                        "https://web.archive.org/web/20200314051506/https://www.vans.com/shop/VFLoyaltyEnrollmentDisplay?langId=-1&storeId=10153&pageName=dashboard&stl_params_hash=eyJzdGxfdGFyZ2V0Ijoib2ZmZXItNjY3In0=&utm_campaign=famuary-20&utm_medium=vans-family&utm_source=famuary_launch&source_campaign=famuary-20_vans-family_famuary_launch_famuary20-day-6&utm_term=famuary20-day-6",
                    winnercity: "Lumberton, NC ",
                },
                {
                    name: "SHOES FOR A YEAR",
                    date: "1/26/20",
                    contentone: "A new pair for each month of the year.",
                    contenttwo: "Your feet will thank you, over and over.",
                    contentthree: "That’s a lot of waffle.",
                    video: {
                        "@id": "day7",
                        "@class": "",
                        "@loop": "loop",
                        "@playsinline": "playsinline",
                        "@poster": "./assets/prize-19.webp",
                        "@data-poster": "./assets/Prize-Scramble3.gif",
                        "@data-src": "./assets/Day7.mp4",
                        "@src": "./assets/Day7.mp4",
                    },
                    winner: "Alisa Kovalick",
                    deeplink:
                        "https://web.archive.org/web/20200314051506/https://www.vans.com/shop/VFLoyaltyEnrollmentDisplay?langId=-1&storeId=10153&pageName=dashboard&stl_params_hash=eyJzdGxfdGFyZ2V0Ijoib2ZmZXItNjc1In0=&utm_campaign=famuary-20&utm_medium=vans-family&utm_source=famuary_launch&source_campaign=famuary-20_vans-family_famuary_launch_famuary20-day-7&utm_term=famuary20-day-7",
                    winnercity: "Myrtle Beach, SC",
                },
                {
                    name: "MYSTERY PRIZE",
                    date: "1/27/20",
                    contentone: "A 50% chance you'll like it.",
                    contenttwo: "A perfect prize for the indecisive!",
                    contentthree: "Life's a mystery, keep it rolling.",
                    video: {
                        "@id": "day8",
                        "@class": "",
                        "@loop": "loop",
                        "@playsinline": "playsinline",
                        "@poster": "./assets/prize-18.webp",
                        "@data-poster": "./assets/static-tile-homepage.gif",
                        "@data-src": "./assets/DAY8.mp4",
                        "@src": "./assets/DAY8.mp4",
                    },
                    winner: "Kelley Mills",
                    deeplink:
                        "https://web.archive.org/web/20200314051506/https://www.vans.com/shop/VFLoyaltyEnrollmentDisplay?langId=-1&storeId=10153&pageName=dashboard&stl_params_hash=eyJzdGxfdGFyZ2V0Ijoib2ZmZXItNjc4In0=&utm_campaign=famuary-20&utm_medium=vans-family&utm_source=famuary_launch&source_campaign=famuary-20_vans-family_famuary_launch_famuary20-day-8&utm_term=famuary20-day-8",
                    winnercity: "North Hollywood, CA",
                },
                {
                    name: "$500 VANS GIFT CARD",
                    date: "1/28/20",
                    contentone: "A remarkable $500 value in savings.",
                    contenttwo: "Fits in your pocket.",
                    contentthree: "The same value as 500 $1 gift cards.",
                    video: {
                        "@id": "day9",
                        "@class": "",
                        "@loop": "loop",
                        "@playsinline": "playsinline",
                        "@poster": "./assets/prize-1.webp",
                        "@data-poster": "./assets/static-tile-homepage.gif",
                        "@data-src": "./assets/DAY9.mp4",
                        "@src": "./assets/DAY9.mp4",
                    },
                    winner: "Melany Austad",
                    deeplink:
                        "https://web.archive.org/web/20200314051506/https://www.vans.com/shop/VFLoyaltyEnrollmentDisplay?langId=-1&storeId=10153&pageName=dashboard&stl_params_hash=eyJzdGxfdGFyZ2V0Ijoib2ZmZXItNjgwIn0=&utm_campaign=famuary-20&utm_medium=vans-family&utm_source=famuary_launch&source_campaign=famuary-20_vans-family_famuary_launch_famuary20-day-9&utm_term=famuary20-day-9",
                    winnercity: "Denver,CO",
                },
                {
                    name: "VANS LUGGAGE SET AND A PAIR OF ULTRARANGE SHOES",
                    date: "1/29/20",
                    contentone: "Get there with your stuff.",
                    contenttwo: "Make your feet happy.",
                    contentthree: "Travel in Vans style.",
                    video: {
                        "@id": "day10",
                        "@class": "",
                        "@loop": "loop",
                        "@playsinline": "playsinline",
                        "@poster": "./assets/prize-2.webp",
                        "@data-poster": "./assets/Prize-Scramble1.gif",
                        "@data-src": "./assets/DAY10.mp4",
                        "@src": "./assets/DAY10.mp4",
                    },
                    winner: "Emily Lawrence",
                    deeplink:
                        "https://web.archive.org/web/20200314051506/https://www.vans.com/shop/VFLoyaltyEnrollmentDisplay?langId=-1&storeId=10153&pageName=dashboard&stl_params_hash=eyJzdGxfdGFyZ2V0Ijoib2ZmZXItNjgyIn0=&utm_campaign=famuary-20&utm_medium=vans-family&utm_source=famuary_launch&source_campaign=famuary-20_vans-family_famuary_launch_famuary20-day-10&utm_term=famuary20-day-10",
                    winnercity: "Seabrook, NH",
                },
                {
                    name: "$1,500 VANS SHOPPING SPREE AT A STORE NEAR YOU",
                    date: "1/30/20",
                    contentone: "Buy some Vans gear for you and you.",
                    contenttwo: "You choose, we buy.",
                    contentthree: "Hope our card doesn't get declined.",
                    video: {
                        "@id": "day11",
                        "@class": "",
                        "@loop": "loop",
                        "@playsinline": "playsinline",
                        "@poster": "./assets/prize-3.webp",
                        "@data-poster": "./assets/static-tile-homepage.gif",
                        "@data-src": "./assets/DAY11.mp4",
                        "@src": "./assets/DAY11.mp4",
                    },
                    winner: "Ava Alexis",
                    deeplink:
                        "https://web.archive.org/web/20200314051506/https://www.vans.com/shop/VFLoyaltyEnrollmentDisplay?langId=-1&storeId=10153&pageName=dashboard&stl_params_hash=eyJzdGxfdGFyZ2V0Ijoib2ZmZXItNjk1In0=&utm_campaign=famuary-20&utm_medium=vans-family&utm_source=famuary_launch&source_campaign=famuary-20_vans-family_famuary_launch_famuary20-day-11&utm_term=famuary20-day-11",
                    winnercity: "Johnston, RI",
                },
                {
                    name: "VANS HQ TOUR WITH STEVE VAN DOREN + VANS LUGGAGE SET",
                    date: "1/31/20",
                    contentone: "Yes, THE Steve Van Doren!",
                    contenttwo: "See where all the Vans magic happens.",
                    contentthree: "Travel to Costa Mesa, CA in style.",
                    video: {
                        "@id": "day12",
                        "@class": "",
                        "@loop": "loop",
                        "@playsinline": "playsinline",
                        "@poster": "./assets/prize-4.webp",
                        "@data-poster": "./assets/Prize-Scramble3.gif",
                        "@data-src": "./assets/DAY12.mp4",
                        "@src": "./assets/DAY12.mp4",
                    },
                    winner: "Ryan Miller",
                    deeplink:
                        "https://web.archive.org/web/20200314051506/https://www.vans.com/shop/VFLoyaltyEnrollmentDisplay?langId=-1&storeId=10153&pageName=dashboard&stl_params_hash=eyJzdGxfdGFyZ2V0Ijoib2ZmZXItNjk3In0=&utm_campaign=famuary-20&utm_medium=vans-family&utm_source=famuary_launch&source_campaign=famuary-20_vans-family_famuary_launch_famuary20-day-12&utm_term=famuary20-day-12",
                    winnercity: "Charleston, SC",
                },
                {
                    name: "HEAD 2 TOE LOOK FOR YOU AND YOUR FAMILY",
                    date: "2/1/20",
                    contentone: "Style out your family in head to toe Vans.",
                    contenttwo: "Perfect for those awkward family photos.",
                    contentthree: "A family that wears Vans together...",
                    video: {
                        "@id": "day13",
                        "@class": "",
                        "@loop": "loop",
                        "@playsinline": "playsinline",
                        "@poster": "./assets/prize-5.webp",
                        "@data-poster": "./assets/static-tile-homepage.gif",
                        "@data-src": "./assets/DAY13.mp4",
                        "@src": "./assets/DAY13.mp4",
                    },
                    winner: "Sienna Hirt",
                    deeplink:
                        "https://web.archive.org/web/20200314051506/https://www.vans.com/shop/VFLoyaltyEnrollmentDisplay?langId=-1&storeId=10153&pageName=dashboard&stl_params_hash=eyJzdGxfdGFyZ2V0Ijoib2ZmZXItNjk5In0=&utm_campaign=famuary-20&utm_medium=vans-family&utm_source=famuary_launch&source_campaign=famuary-20_vans-family_famuary_launch_famuary20-day-13&utm_term=famuary20-day-13",
                    winnercity: "Muskego, WI",
                },
                {
                    name: "$1,000 VANS GIFT CARD",
                    date: "2/2/20",
                    contentone: "Spend it all at one place.",
                    contenttwo: "New lightweight design.",
                    contentthree: "Glossy finish.",
                    video: {
                        "@id": "day14",
                        "@class": "",
                        "@loop": "loop",
                        "@playsinline": "playsinline",
                        "@poster": "./assets/prize-1.webp",
                        "@data-poster": "./assets/Prize-Scramble3.gif",
                        "@data-src": "./assets/DAY14.mp4",
                        "@src": "./assets/DAY14.mp4",
                    },
                    winner: "Carly Toepfer-Gaver",
                    deeplink:
                        "https://web.archive.org/web/20200314051506/https://www.vans.com/shop/VFLoyaltyEnrollmentDisplay?langId=-1&storeId=10153&pageName=dashboard&stl_params_hash=eyJzdGxfdGFyZ2V0Ijoib2ZmZXItNzAxIn0=&utm_campaign=famuary-20&utm_medium=vans-family&utm_source=famuary_launch&source_campaign=famuary-20_vans-family_famuary_launch_famuary20-day-14&utm_term=famuary20-day-14",
                    winnercity: "Perrysburg, OH",
                },
                {
                    name: "HEAD 2 TOE SKATE LOOK FOR YOU AND A FRIEND",
                    date: "2/3/20",
                    contentone: "For maximum shred-ability.",
                    contenttwo: "You can match if you want to, or not.",
                    contentthree: "Hook up your homie.",
                    video: {
                        "@id": "day15",
                        "@class": "",
                        "@loop": "loop",
                        "@playsinline": "playsinline",
                        "@poster": "./assets/prize-7.webp",
                        "@data-poster": "./assets/Prize-Scramble1.gif",
                        "@data-src": "./assets/DAY15.mp4",
                        "@src": "./assets/DAY15.mp4",
                    },
                    winner: "Dawn Robison",
                    deeplink:
                        "https://web.archive.org/web/20200314051506/https://www.vans.com/shop/VFLoyaltyEnrollmentDisplay?langId=-1&storeId=10153&pageName=dashboard&stl_params_hash=eyJzdGxfdGFyZ2V0Ijoib2ZmZXItNzAzIn0=&utm_campaign=famuary-20&utm_medium=vans-family&utm_source=famuary_launch&source_campaign=famuary-20_vans-family_famuary_launch_famuary20-day-15&utm_term=famuary20-day-15",
                    winnercity: "Oklahoma City, OK",
                },
                {
                    name: "VANS T-SHIRTS FOR A YEAR",
                    date: "2/4/20",
                    contentone: "A new shirt for every week of the year.",
                    contenttwo: "A great excuse to do less laundry.",
                    contentthree: "Where to put them all? Not our problem.",
                    video: {
                        "@id": "day16",
                        "@class": "",
                        "@loop": "loop",
                        "@playsinline": "playsinline",
                        "@poster": "./assets/prize-8.webp",
                        "@data-poster": "./assets/static-tile-homepage.gif",
                        "@data-src": "./assets/DAY16.mp4",
                        "@src": "./assets/DAY16.mp4",
                    },
                    winner: "Tyson Shumway",
                    deeplink:
                        "https://web.archive.org/web/20200314051506/https://www.vans.com/shop/VFLoyaltyEnrollmentDisplay?langId=-1&storeId=10153&pageName=dashboard&stl_params_hash=eyJzdGxfdGFyZ2V0Ijoib2ZmZXItNzA1In0=&utm_campaign=famuary-20&utm_medium=vans-family&utm_source=famuary_launch&source_campaign=famuary-20_vans-family_famuary_launch_famuary20-day-16&utm_term=famuary20-day-16",
                    winnercity: "Orangevale, CA",
                },
                {
                    name: "BACKPACKS FOR YOU AND YOUR CLASSMATES",
                    date: "2/5/20",
                    contentone: "We've got your back and 29 others.",
                    contenttwo: "An exciting way to carry your stuff.",
                    contentthree: "You can do it, put your back into it.",
                    video: {
                        "@id": "day17",
                        "@class": "",
                        "@loop": "loop",
                        "@playsinline": "playsinline",
                        "@poster": "./assets/prize-9.webp",
                        "@data-poster": "./assets/Prize-Scramble1.gif",
                        "@data-src": "./assets/DAY17.mp4",
                        "@src": "./assets/DAY17.mp4",
                    },
                    winner: "Isabel Sanchez",
                    deeplink:
                        "https://web.archive.org/web/20200314051506/https://www.vans.com/shop/VFLoyaltyEnrollmentDisplay?langId=-1&storeId=10153&pageName=dashboard&stl_params_hash=eyJzdGxfdGFyZ2V0Ijoib2ZmZXItNzA3In0=&utm_campaign=famuary-20&utm_medium=vans-family&utm_source=famuary_launch&source_campaign=famuary-20_vans-family_famuary_launch_famuary20-day-17&utm_term=famuary20-day-17",
                    winnercity: "Desert Hot Springs, CA",
                },
                {
                    name: "MYSTERY SKATE PRIZE",
                    date: "2/6/20",
                    contentone: "A prize full of mystery and some skate stuff.",
                    contenttwo: "Reusable box.",
                    contentthree: "No skateboard required.",
                    video: {
                        "@id": "day18",
                        "@class": "",
                        "@loop": "loop",
                        "@playsinline": "playsinline",
                        "@poster": "./assets/prize-10.webp",
                        "@data-poster": "./assets/static-tile-homepage.gif",
                        "@data-src": "./assets/DAY18.mp4",
                        "@src": "./assets/DAY18.mp4",
                    },
                    winner: "Chaps Khan",
                    deeplink:
                        "https://web.archive.org/web/20200314051506/https://www.vans.com/shop/VFLoyaltyEnrollmentDisplay?langId=-1&storeId=10153&pageName=dashboard&stl_params_hash=eyJzdGxfdGFyZ2V0Ijoib2ZmZXItNzA5In0=&utm_campaign=famuary-20&utm_medium=vans-family&utm_source=famuary_launch&source_campaign=famuary-20_vans-family_famuary_launch_famuary20-day-18&utm_term=famuary20-day-18",
                    winnercity: "Trabuco Canyon, CA",
                },
                {
                    name: "SHOES FOR A YEAR FOR YOU AND YOUR FAM",
                    date: "2/7/20",
                    contentone: "Comes in pairs.",
                    contenttwo: "Laces included.",
                    contentthree: "If only you had more feet.",
                    video: {
                        "@id": "day19",
                        "@class": "",
                        "@loop": "loop",
                        "@playsinline": "playsinline",
                        "@poster": "./assets/prize-11.webp",
                        "@data-poster": "./assets/Prize-Scramble3.gif",
                        "@data-src": "./assets/DAY19.mp4",
                        "@src": "./assets/DAY19.mp4",
                    },
                    winner: "Muhammad Chamas",
                    deeplink:
                        "https://web.archive.org/web/20200314051506/https://www.vans.com/shop/VFLoyaltyEnrollmentDisplay?langId=-1&storeId=10153&pageName=dashboard&stl_params_hash=eyJzdGxfdGFyZ2V0Ijoib2ZmZXItNzExIn0=&utm_campaign=famuary-20&utm_medium=vans-family&utm_source=famuary_launch&source_campaign=famuary-20_vans-family_famuary_launch_famuary20-day-19&utm_term=famuary20-day-19",
                    winnercity: "Livonia, MI",
                },
                {
                    name: "$1,000 VANS GIFT CARD",
                    date: "2/8/20",
                    contentone: "An incredible $1,000 in savings!",
                    contenttwo: "New lightweight design.",
                    contentthree: "Glossy finish.",
                    video: {
                        "@id": "day20",
                        "@class": "",
                        "@loop": "loop",
                        "@playsinline": "playsinline",
                        "@poster": "./assets/prize-1.webp",
                        "@data-poster": "./assets/static-tile-homepage.gif",
                        "@data-src": "./assets/DAY20.mp4",
                        "@src": "./assets/DAY20.mp4",
                    },
                    winner: "Cynthia Vasquez",
                    deeplink:
                        "https://web.archive.org/web/20200314051506/https://www.vans.com/shop/VFLoyaltyEnrollmentDisplay?langId=-1&storeId=10153&pageName=dashboard&stl_params_hash=eyJzdGxfdGFyZ2V0Ijoib2ZmZXItNzEzIn0=&utm_campaign=famuary-20&utm_medium=vans-family&utm_source=famuary_launch&source_campaign=famuary-20_vans-family_famuary_launch_famuary20-day-20&utm_term=famuary20-day-20",
                    winnercity: "Far Rockaway, NY",
                },
            ];

            function initializeVideos(videoData) {
                const container = document.querySelector('.secondary__grid--only');
                
                videoData.forEach(item => {
                  const gridItem = container.querySelector(`[data-hash="${item.video['@id']}"]`);
                  if (gridItem) {
                    const videoElement = document.createElement('video');
                    videoElement.id = item.video['@id'];
                    videoElement.className = 'custom-prize-video';
                    videoElement.loop = item.video['@loop'] === 'loop';
                    videoElement.playsInline = item.video['@playsinline'] === 'playsinline';
                    videoElement.poster = item.video['@poster'];
                    videoElement.dataset.poster = item.video['@data-poster'];
                    videoElement.dataset.src = item.video['@data-src'];
                    videoElement.src = item.video['@src'];
                    videoElement.autoplay = true;
              
                    gridItem.appendChild(videoElement);
              
                    const overlay = document.createElement('div');
                    overlay.className = 'famuary__gridcolumn';
                    const gridRowWinner = document.createElement('div');
                    overlay.className = 'famuary__gridrow--winner';
                    overlay.appendChild(gridRowWinner);

                    const dayHeading = document.createElement('h4');
                    dayHeading.className = 'prize__heading--small--winner fake--stroke';
                    dayHeading.textContent = item.video['@id'].replace('day', 'DAY ');

                    // const prizeHeading = document.createElement('h4');
                    // prizeHeading.className = 'prize__heading--small';
                    // prizeHeading.textContent = item.name;
                   
                    const dayText = document.createElement('div');
                    dayText.className = 'famuary__gridcol--1';
                    dayText.innerHTML = `<img src="https://colorincode.me/portfolio/assets/starburst-winner2x.png" alt="Winner">`;
                    overlay.appendChild(dayText);
              
                    const prizeTextWrap = document.createElement('div');
                    prizeTextWrap.className = 'famuary__gridcol--2';
                    overlay.appendChild(prizeTextWrap);
                 
              
                    const winner = document.createElement("h4");
                    winner.className = "fake--white--stroke winner-name";
                    winner.textContent = item.winner;
                    const winnercity = document.createElement("h4");
                    winnercity.className = "prize__heading--small--winner--city";
                    winnercity.textContent = item.winnercity;
                    prizeTextWrap.appendChild(winner);
                    prizeTextWrap.appendChild(winnercity);

                    const gridRow = document.createElement('div');
                    gridRow.className = 'famuary__gridrow';
                    gridRow.appendChild(dayHeading);
                   
                    gridItem.appendChild(gridRow);
                    const prizeText = document.createElement('h4');
                    prizeText.className = 'prize__heading--small';
                    prizeText.textContent = item.name;
                    gridRow.appendChild(prizeText);
                    // gridRow.appendChild(prizeHeading);
                    // const descText = document.createElement('ul');
                    // descText.className = 'desc-text';
                    // ['contentone', 'contenttwo', 'contentthree'].forEach(content => {
                    //   if (item[content]) {
                    //     const li = document.createElement('li');
                    //     li.textContent = item[content];
                    //     descText.appendChild(li);
                    //   }
                    // });
                    // overlay.appendChild(descText);
              
                    // const button = document.createElement('a');
                    // button.className = 'famuary--button';
                    // button.href = item.deeplink;
                    // button.textContent = 'Learn More';
                    // overlay.appendChild(button);
              
                    gridItem.appendChild(overlay);
                  }
                });
              }
              
              

            //   // Call the function with the video data
            //   initializeVideos(videoData);
              

let marqueeEl: HTMLElement;
// let marqueeHolder: HTMLElement;
let marqueeHolder = document.querySelector('.famuary-marquee__inner');
let targets = gsap.utils.toArray(".famuary-marquee__inner");
function initMarquee(): void {
    console.log('Initializing marquee');
    // if (!this.marqueeEl) {
    //     console.error('Marquee element not found');
    //     return;
    // }
    // this.marqueeEl = document.querySelector('.famuary-marquee');
    // this.marqueeHolder = this.marqueeEl.querySelector('.famuary-marquee__inner');
    // gsap.set(marqueeHolder, { x: 0 });
    // gsap.to(marqueeHolder, {
    //     duration: 10,
    //     x: -700,
    //     ease: "none",
    //     yoyo: true,
    //     repeat: -1
    // });
    targets.forEach(target => {
        gsap.to(".famuary-marquee__inner", { 
            x: -700, 
            duration: 10, // seconds
            ease: "none",
            stagger: 0.1,
            repeat: -1, 
            yoyo: true, // if true > A-B-B-A, if false > A-B-A-B
            onComplete: () => {
              console.log("finished")
            },
            // other callbacks:
            // onStart, onUpdate, onRepeat, onReverseComplete
          });
    })
 
}

function restartMarquee (): void {
    gsap.killTweensOf(this.marqueeHolder);
    gsap.set(marqueeHolder, { x: 0 });
    targets.forEach(target => {
        gsap.to(".famuary-marquee__inner", { 
            x: -700, 
            duration: 10, // seconds
            ease: "none",
            stagger: 0.1,
            repeat: -1, 
            yoyo: true, // if true > A-B-B-A, if false > A-B-A-B
            onComplete: () => {
              console.log("finished")
            },
            // other callbacks:
            // onStart, onUpdate, onRepeat, onReverseComplete
          });
    })
}
document.addEventListener('DOMContentLoaded', () => {
    initializeVideos(videoData);
    initMarquee();

});
document.addEventListener('resize', () => {
    restartMarquee();
});

