(M={}).parent=Game.Objects["Wizard tower"],M.parent.minigame=M,M.launch=function(){var e=this;e.name=e.parent.minigameName,e.init=function(i){e.spells={"conjure baked goods":{name:"Conjure Baked Goods",desc:"Summon half an hour worth of your CpS, capped at 15% of your cookies owned.",failDesc:"Trigger a 15-minute clot and lose 15 minutes of CpS.",icon:[21,11],costMin:2,costPercent:.4,win:function(){var e=Math.max(7,Math.min(.15*Game.cookies,60*Game.cookiesPs*30));Game.Earn(e),Game.Notify("Conjure baked goods!","You magic <b>"+Beautify(e)+" cookie"+(1==e?"":"s")+"</b> out of thin air.",[21,11],6),Game.Popup('<div style="font-size:80%;">+'+Beautify(e)+" cookie"+(1==e?"":"s")+"!</div>",Game.mouseX,Game.mouseY)},fail:function(){var e=Game.gainBuff("clot",900,.5),i=Math.min(.15*Game.cookies,60*Game.cookiesPs*15)+13;i=Math.min(Game.cookies,i),Game.Spend(i),Game.Notify(e.name,e.desc,e.icon,6),Game.Popup('<div style="font-size:80%;">Backfire!<br>Summoning failed! Lost '+Beautify(i)+" cookie"+(1==i?"":"s")+"!</div>",Game.mouseX,Game.mouseY)}},"hand of fate":{name:"Force the Hand of Fate",desc:"Summon a random golden cookie. Each existing golden cookie makes this spell +15% more likely to backfire.",failDesc:"Summon an unlucky wrath cookie.",icon:[22,11],costMin:10,costPercent:.6,failFunc:function(e){return e+.15*Game.shimmerTypes.golden.n},win:function(){var e=new Game.shimmer("golden",{noWrath:!0}),i=[];i.push("frenzy","multiply cookies"),Game.hasBuff("Dragonflight")||i.push("click frenzy"),Math.random()<.1&&i.push("cookie storm","cookie storm","blab"),Game.BuildingsOwned>=10&&Math.random()<.25&&i.push("building special"),Math.random()<.15&&(i=["cookie storm drop"]),Math.random()<1e-4&&i.push("free sugar lump"),e.force=choose(i),"cookie storm drop"==e.force&&(e.sizeMult=.75*Math.random()+.25),Game.Popup('<div style="font-size:80%;">Promising fate!</div>',Game.mouseX,Game.mouseY)},fail:function(){var e=new Game.shimmer("golden",{wrath:!0}),i=[];i.push("clot","ruin cookies"),Math.random()<.1&&i.push("cursed finger","blood frenzy"),Math.random()<.003&&i.push("free sugar lump"),Math.random()<.1&&(i=["blab"]),e.force=choose(i),Game.Popup('<div style="font-size:80%;">Backfire!<br>Sinister fate!</div>',Game.mouseX,Game.mouseY)}},"stretch time":{name:"Stretch Time",desc:"All active buffs gain 10% more time (up to 5 more minutes).",failDesc:"All active buffs are shortened by 20% (up to 10 minutes shorter).",icon:[23,11],costMin:8,costPercent:.2,win:function(){var e=0;for(var i in Game.buffs){var a=Game.buffs[i],o=Math.min(60*Game.fps*5,.1*a.maxTime);a.maxTime+=o,a.time+=o,e++}if(0==e)return Game.Popup('<div style="font-size:80%;">No buffs to alter!</div>',Game.mouseX,Game.mouseY),-1;Game.Popup('<div style="font-size:80%;">Zap! Buffs lengthened.</div>',Game.mouseX,Game.mouseY)},fail:function(){var e=0;for(var i in Game.buffs){var a=Game.buffs[i],o=Math.min(60*Game.fps*10,.2*a.time);a.time-=o,a.time=Math.max(a.time,0),e++}if(0==e)return Game.Popup('<div style="font-size:80%;">No buffs to alter!</div>',Game.mouseX,Game.mouseY),-1;Game.Popup('<div style="font-size:80%;">Backfire!<br>Fizz! Buffs shortened.</div>',Game.mouseX,Game.mouseY)}},"spontaneous edifice":{name:"Spontaneous Edifice",desc:"The spell picks a random building you could afford if you had twice your current cookies, and gives it to you for free. The building selected must be under 400, and cannot be your most-built one (unless it is your only one).",failDesc:"Lose a random building.",icon:[24,11],costMin:20,costPercent:.75,win:function(){var e=[],i=0,a=0;for(var o in Game.Objects)Game.Objects[o].amount>i&&(i=Game.Objects[o].amount),Game.Objects[o].amount>0&&a++;for(var o in Game.Objects)(Game.Objects[o].amount<i||1==a)&&Game.Objects[o].getPrice()<=2*Game.cookies&&Game.Objects[o].amount<400&&e.push(Game.Objects[o]);if(0==e.length)return Game.Popup('<div style="font-size:80%;">No buildings to improve!</div>',Game.mouseX,Game.mouseY),-1;var t=choose(e);t.buyFree(1),Game.Popup('<div style="font-size:80%;">A new '+t.single+"<br>bursts out of the ground.</div>",Game.mouseX,Game.mouseY)},fail:function(){if(0==Game.BuildingsOwned)return Game.Popup('<div style="font-size:80%;">Backfired, but no buildings to destroy!</div>',Game.mouseX,Game.mouseY),-1;var e=[];for(var i in Game.Objects)Game.Objects[i].amount>0&&e.push(Game.Objects[i]);var a=choose(e);a.sacrifice(1),Game.Popup('<div style="font-size:80%;">Backfire!<br>One of your '+a.plural+"<br>disappears in a puff of smoke.</div>",Game.mouseX,Game.mouseY)}},"haggler's charm":{name:"Haggler's Charm",desc:"Upgrades are 2% cheaper for 1 minute.",failDesc:"Upgrades are 2% more expensive for an hour.<q>What's that spell? Loadsamoney!</q>",icon:[25,11],costMin:10,costPercent:.1,win:function(){Game.killBuff("Haggler's misery");Game.gainBuff("haggler luck",60,2);Game.Popup('<div style="font-size:80%;">Upgrades are cheaper!</div>',Game.mouseX,Game.mouseY)},fail:function(){Game.killBuff("Haggler's luck");Game.gainBuff("haggler misery",3600,2);Game.Popup('<div style="font-size:80%;">Backfire!<br>Upgrades are pricier!</div>',Game.mouseX,Game.mouseY)}},"summon crafty pixies":{name:"Summon Crafty Pixies",desc:"Buildings are 2% cheaper for 1 minute.",failDesc:"Buildings are 2% more expensive for an hour.",icon:[26,11],costMin:10,costPercent:.2,win:function(){Game.killBuff("Nasty goblins");Game.gainBuff("pixie luck",60,2);Game.Popup('<div style="font-size:80%;">Crafty pixies!<br>Buildings are cheaper!</div>',Game.mouseX,Game.mouseY)},fail:function(){Game.killBuff("Crafty pixies");Game.gainBuff("pixie misery",3600,2);Game.Popup('<div style="font-size:80%;">Backfire!<br>Nasty goblins!<br>Buildings are pricier!</div>',Game.mouseX,Game.mouseY)}},"gambler's fever dream":{name:"Gambler's Fever Dream",desc:"Cast a random spell at half the magic cost, with twice the chance of backfiring.",icon:[27,11],costMin:3,costPercent:.05,win:function(){var i=[],a=e.getSpellCost(e.spells["gambler's fever dream"]);for(var o in e.spells)"gambler's fever dream"!=o&&e.magic-a>=.5*e.getSpellCost(e.spells[o])&&i.push(e.spells[o]);if(0==i.length)return Game.Popup('<div style="font-size:80%;">No eligible spells!</div>',Game.mouseX,Game.mouseY),-1;var t=choose(i),n=.5*e.getSpellCost(t);setTimeout(function(i,o,t){return function(){if(Game.seed!=t)return!1;e.castSpell(i,{cost:o,failChanceMax:.5,passthrough:!0})||(e.magic+=a,setTimeout((function(){Game.Popup('<div style="font-size:80%;">That\'s too bad!<br>Magic refunded.</div>',Game.mouseX,Game.mouseY)}),1500))}}(t,n,Game.seed),1e3),Game.Popup('<div style="font-size:80%;">Casting '+t.name+"<br>for "+Beautify(n)+" magic...</div>",Game.mouseX,Game.mouseY)}},"resurrect abomination":{name:"Resurrect Abomination",desc:"Instantly summon a wrinkler if conditions are fulfilled.",failDesc:"Pop one of your wrinklers.",icon:[28,11],costMin:20,costPercent:.1,win:function(){if(!Game.SpawnWrinkler())return Game.Popup('<div style="font-size:80%;">Unable to spawn a wrinkler!</div>',Game.mouseX,Game.mouseY),-1;Game.Popup('<div style="font-size:80%;">Rise, my precious!</div>',Game.mouseX,Game.mouseY)},fail:function(){if(!Game.PopRandomWrinkler())return Game.Popup('<div style="font-size:80%;">Backfire!<br>But no wrinkler was harmed.</div>',Game.mouseX,Game.mouseY),-1;Game.Popup('<div style="font-size:80%;">Backfire!<br>So long, ugly...</div>',Game.mouseX,Game.mouseY)}},"diminish ineptitude":{name:"Diminish Ineptitude",desc:"Spells backfire 10 times less for the next 5 minutes.",failDesc:"Spells backfire 5 times more for the next 10 minutes.",icon:[29,11],costMin:5,costPercent:.2,win:function(){Game.killBuff("Magic inept");Game.gainBuff("magic adept",300,10);Game.Popup('<div style="font-size:80%;">Ineptitude diminished!</div>',Game.mouseX,Game.mouseY)},fail:function(){Game.killBuff("Magic adept");Game.gainBuff("magic inept",600,5);Game.Popup('<div style="font-size:80%;">Backfire!<br>Ineptitude magnified!</div>',Game.mouseX,Game.mouseY)}}},e.spellsById=[];var a=0;for(var o in e.spells)e.spells[o].id=a,e.spellsById[a]=e.spells[o],a++;e.computeMagicM=function(){var i=Math.max(e.parent.amount,1),a=Math.max(e.parent.level,1);e.magicM=Math.floor(4+Math.pow(i,.6)+15*Math.log((i+10*(a-1))/15+1)),e.magic=Math.min(e.magicM,e.magic)},e.getFailChance=function(e){var i=.15;return Game.hasBuff("Magic adept")&&(i*=.1),Game.hasBuff("Magic inept")&&(i*=5),e.failFunc&&(i=e.failFunc(i)),i},e.castSpell=function(i,a){var o=0,t=0,n=!1;if(t=void 0!==(a=a||{}).cost?a.cost:e.getSpellCost(i),e.magic<t)return!1;var s=e.getFailChance(i);if(void 0!==a.failChanceSet&&(s=a.failChanceSet),void 0!==a.failChanceAdd&&(s+=a.failChanceAdd),void 0!==a.failChanceMult&&(s*=a.failChanceMult),void 0!==a.failChanceMax&&(s=Math.max(s,a.failChanceMax)),Math.seedrandom(Game.seed+"/"+e.spellsCastTotal),!i.fail||Math.random()<1-s?o=i.win():(n=!0,o=i.fail()),Math.seedrandom(),-1!=o){i.passthrough||a.passthrough||(e.spellsCast++,e.spellsCastTotal++,e.spellsCastTotal>=9&&Game.Win("Bibbidi-bobbidi-boo"),e.spellsCastTotal>=99&&Game.Win("I'm the wiz"),e.spellsCastTotal>=999&&Game.Win("A wizard is you")),e.magic-=t,e.magic=Math.max(0,e.magic);var r=l("grimoireSpell"+i.id).getBoundingClientRect();return Game.SparkleAt((r.left+r.right)/2,(r.top+r.bottom)/2-24),n?PlaySound("snd/spellFail.mp3",.75):PlaySound("snd/spell.mp3",.75),!0}return PlaySound("snd/spellFail.mp3",.75),!1},e.getSpellCost=function(i){var a=i.costMin;return i.costPercent&&(a+=e.magicM*i.costPercent),Math.floor(a)},e.getSpellCostBreakdown=function(e){var i="";return e.costPercent?i+=Beautify(e.costMin)+" magic +"+Beautify(Math.ceil(100*e.costPercent))+"% of max magic":i+=Beautify(e.costMin)+" magic",i},e.spellTooltip=function(i){return function(){var a=e.spellsById[i];a.icon=a.icon||[28,12];var o=Beautify(e.getSpellCost(a)),t=e.getSpellCostBreakdown(a);t=o!=t?" <small>("+t+")</small>":"";var n=e.getFailChance(a);return'<div style="padding:8px 4px;min-width:350px;"><div class="icon" style="float:left;margin-left:-8px;margin-top:-8px;background-position:'+48*-a.icon[0]+"px "+48*-a.icon[1]+'px;"></div><div class="name">'+a.name+'</div><div>Magic cost : <b style="color:#'+(o<=e.magic?"6f6":"f66")+';">'+o+"</b>"+t+"</div>"+(a.fail?'<div><small>Chance to backfire : <b style="color:#f66">'+Math.ceil(100*n)+"%</b></small></div>":"")+'<div class="line"></div><div class="description"><b>Effect :</b> <span class="green">'+(a.descFunc?a.descFunc():a.desc)+"</span>"+(a.failDesc?'<div style="height:8px;"></div><b>Backfire :</b> <span class="red">'+a.failDesc+"</span>":"")+"</div></div>"}};var t="";for(var o in t+="<style>#grimoireBG{background:url(img/shadedBorders.png),url(img/BGgrimoire.jpg);background-size:100% 100%,auto;position:absolute;left:0px;right:0px;top:0px;bottom:16px;}#grimoireContent{position:relative;box-sizing:border-box;padding:4px 24px;}#grimoireBar{max-width:95%;margin:4px auto;height:16px;}#grimoireBarFull{transform:scale(1,2);transform-origin:50% 0;height:50%;}#grimoireBarText{transform:scale(1,0.8);width:100%;position:absolute;left:0px;top:0px;text-align:center;color:#fff;text-shadow:-1px 1px #000,0px 0px 4px #000,0px 0px 6px #000;margin-top:2px;}#grimoireSpells{text-align:center;width:100%;padding:8px;box-sizing:border-box;}.grimoireIcon{pointer-events:none;margin:2px 6px 0px 6px;width:48px;height:48px;opacity:0.8;position:relative;}.grimoirePrice{pointer-events:none;}.grimoireSpell{box-shadow:4px 4px 4px #000;cursor:pointer;position:relative;color:#f33;opacity:0.8;text-shadow:0px 0px 4px #000,0px 0px 6px #000;font-weight:bold;font-size:12px;display:inline-block;width:60px;height:74px;background:url(img/spellBG.png);}.grimoireSpell.ready{color:rgba(255,255,255,0.8);opacity:1;}.grimoireSpell.ready:hover{color:#fff;}.grimoireSpell:hover{box-shadow:6px 6px 6px 2px #000;z-index:1000000001;top:-1px;}.grimoireSpell:active{top:1px;}.grimoireSpell.ready .grimoireIcon{opacity:1;}.grimoireSpell:hover{background-position:0px -74px;} .grimoireSpell:active{background-position:0px 74px;}.grimoireSpell:nth-child(4n+1){background-position:-60px 0px;} .grimoireSpell:nth-child(4n+1):hover{background-position:-60px -74px;} .grimoireSpell:nth-child(4n+1):active{background-position:-60px 74px;}.grimoireSpell:nth-child(4n+2){background-position:-120px 0px;} .grimoireSpell:nth-child(4n+2):hover{background-position:-120px -74px;} .grimoireSpell:nth-child(4n+2):active{background-position:-120px 74px;}.grimoireSpell:nth-child(4n+3){background-position:-180px 0px;} .grimoireSpell:nth-child(4n+3):hover{background-position:-180px -74px;} .grimoireSpell:nth-child(4n+3):active{background-position:-180px 74px;}.grimoireSpell:hover .grimoireIcon{top:-1px;}.grimoireSpell.ready:hover .grimoireIcon{animation-name:bounce;animation-iteration-count:infinite;animation-duration:0.8s;}.noFancy .grimoireSpell.ready:hover .grimoireIcon{animation:none;}#grimoireInfo{text-align:center;font-size:11px;margin-top:12px;color:rgba(255,255,255,0.75);text-shadow:-1px 1px 0px #000;}</style>",t+='<div id="grimoireBG"></div>',t+='<div id="grimoireContent">',t+='<div id="grimoireSpells">',e.spells){var n=(s=e.spells[o]).icon||[28,12];t+='<div class="grimoireSpell titleFont" id="grimoireSpell'+s.id+'" '+Game.getDynamicTooltip("Game.ObjectsById["+e.parent.id+"].minigame.spellTooltip("+s.id+")","this")+'><div class="usesIcon shadowFilter grimoireIcon" style="background-position:'+48*-n[0]+"px "+48*-n[1]+'px;"></div><div class="grimoirePrice" id="grimoirePrice'+s.id+'">-</div></div>'}t+="</div>";n=[29,14];for(var o in t+='<div id="grimoireBar" class="smallFramed meterContainer"><div '+Game.getDynamicTooltip("Game.ObjectsById["+e.parent.id+"].minigame.refillTooltip","this")+' id="grimoireLumpRefill" class="usesIcon shadowFilter lumpRefill" style="left:-40px;top:-17px;background-position:'+48*-n[0]+"px "+48*-n[1]+'px;"></div><div id="grimoireBarFull" class="meter filling"></div><div id="grimoireBarText" class="titleFont"></div><div '+Game.getTooltip('<div style="padding:8px;width:300px;font-size:11px;text-align:center;">This is your magic meter. Each spell costs magic to use.<div class="line"></div>Your maximum amount of magic varies depending on your amount of <b>Wizard towers</b>, and their level.<div class="line"></div>Magic refills over time. The lower your magic meter, the slower it refills.</div>')+' style="position:absolute;left:0px;top:0px;right:0px;bottom:0px;"></div></div>',t+='<div id="grimoireInfo"></div>',t+="</div>",i.innerHTML=t,e.magicBarL=l("grimoireBar"),e.magicBarFullL=l("grimoireBarFull"),e.magicBarTextL=l("grimoireBarText"),e.lumpRefill=l("grimoireLumpRefill"),e.infoL=l("grimoireInfo"),e.spells){var s=e.spells[o];AddEvent(l("grimoireSpell"+s.id),"click",function(i){return function(){PlaySound("snd/tick.mp3"),e.castSpell(i)}}(s))}e.refillTooltip=function(){return'<div style="padding:8px;width:300px;font-size:11px;text-align:center;">Click to refill <b>100 units</b> of your magic meter for <span class="price lump">1 sugar lump</span>.'+(Game.canRefillLump()?"<br><small>(can be done once every "+Game.sayTime(Game.getLumpRefillMax(),-1)+")</small>":'<br><small class="red">(usable again in '+Game.sayTime(Game.getLumpRefillRemaining()+Game.fps,-1)+")</small>")+"</div>"},AddEvent(e.lumpRefill,"click",(function(){e.magic<e.magicM&&Game.refillLump(1,(function(){e.magic+=100,e.magic=Math.min(e.magic,e.magicM),PlaySound("snd/pop"+Math.floor(3*Math.random()+1)+".mp3",.75)}))})),e.computeMagicM(),e.magic=e.magicM,e.spellsCast=0,e.spellsCastTotal=0},e.save=function(){return parseFloat(e.magic)+" "+parseInt(Math.floor(e.spellsCast))+" "+parseInt(Math.floor(e.spellsCastTotal))+" "+parseInt(e.parent.onMinigame?"1":"0")},e.load=function(i){if(!i)return!1;var a=0,o=i.split(" ");e.computeMagicM(),e.magic=parseFloat(o[a++]||e.magicM),e.spellsCast=parseInt(o[a++]||0),e.spellsCastTotal=parseInt(o[a++]||0),parseInt(o[a++]||0)&&1!=Game.ascensionMode&&e.parent.switchMinigame(1)},e.reset=function(){e.computeMagicM(),e.magic=e.magicM,e.spellsCast=0},e.logic=function(){if(Game.T%5==0&&e.computeMagicM(),e.magicPS=.002*Math.max(.002,Math.pow(e.magic/Math.max(e.magicM,100),.5)),e.magic+=e.magicPS,e.magic=Math.min(e.magic,e.magicM),Game.T%5==0)for(var i in e.spells){var a=e.spells[i],o=e.getSpellCost(a);l("grimoirePrice"+a.id).innerHTML=Beautify(o),e.magic<o?l("grimoireSpell"+a.id).className="grimoireSpell titleFont":l("grimoireSpell"+a.id).className="grimoireSpell titleFont ready"}},e.draw=function(){e.magicBarTextL.innerHTML=Math.min(Math.floor(e.magicM),Beautify(e.magic))+"/"+Beautify(Math.floor(e.magicM))+(e.magic<e.magicM?" (+"+Beautify((e.magicPS||0)*Game.fps,2)+"/s)":""),e.magicBarFullL.style.width=e.magic/e.magicM*100+"%",e.magicBarL.style.width=3*e.magicM+"px",e.infoL.innerHTML="Spells cast : "+Beautify(e.spellsCast)+" (total : "+Beautify(e.spellsCastTotal)+")"},e.init(l("rowSpecial"+e.parent.id))};var M=0;