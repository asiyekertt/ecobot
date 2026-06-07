const logo = "assets/images/logo.png";
let endpoint = localStorage.getItem("ecobot_endpoint") || "";
let history = [];

const SYSTEM_PROMPT = `You are EcoBot, an English-only environmental education chatbot for 9th and 10th grade students. You answer questions about Biology, Geography, Environmental Awareness, Sustainability, Recycling & Waste, Water & Oceans, Climate Change, Biodiversity, Energy, ecosystems, food chains, energy flow, matter cycles, endemic species, renewable energy, fossil fuels, plastic pollution, water conservation, sustainable fishing, and ecological thinking. Use clear student-friendly English, short headings, examples, and one reflective question at the end.`;

const answers = [
  {
    keys:["hello","hi","hey","good morning","good afternoon","good evening","how are you"],
    answer:`Hello! 👋 I am EcoBot. I can help you learn about:

• Recycling & Waste
• Water & Oceans
• Climate Change
• Biodiversity
• Energy
• Ecosystems and food chains
• Environmental awareness and sustainability

What would you like to explore today?`
  },
  {
    keys:["old batteries","electronic waste","e-waste","battery"],
    answer:`Old batteries and electronic waste should not be thrown into regular trash. They can contain metals and chemicals that may harm soil and water.

What to do:
• Take them to an e-waste collection point.
• Use battery collection boxes at schools, stores, or municipal centers.
• Keep damaged batteries separate and handle them carefully.

Why does safe disposal matter for underground water?`
  },
  {
    keys:["pizza box","oil stains","greasy pizza"],
    answer:`Pizza boxes can usually be recycled only if they are clean. If the cardboard has oil, cheese, or food stains, that dirty part should not go into paper recycling.

Best choice:
• Recycle the clean lid or clean cardboard parts.
• Compost the greasy part if local composting is available.
• Put heavily contaminated cardboard in general waste if composting is not possible.

Why do you think food residue makes recycling harder?`
  },
  {
    keys:["separate my waste","sort household waste","waste separation","separate waste","which bin","plastic bottles","household waste"],
    answer:`Waste separation means putting each type of waste into the correct bin so it can be recycled or treated safely.

Common sorting:
• Paper and cardboard: paper recycling bin
• Plastic bottles and packaging: plastic recycling bin
• Glass bottles and jars: glass recycling bin
• Metal cans: metal recycling bin
• Food scraps: organic waste or compost
• Batteries and electronics: special collection points

Which waste type do students produce most often at school?`
  },
  {
    keys:["materials can be recycled","common recyclables","recyclables"],
    answer:`Common recyclable materials include:

• Paper and cardboard
• Plastic bottles and some plastic packaging
• Glass bottles and jars
• Metal cans
• Clean cartons in some local systems

Recycling rules can vary by city, so local bin labels are important. Clean and dry materials are easier to recycle.

Which recyclable material do you use most often in daily life?`
  },
  {
    keys:["students do at school","reduce waste at school","recycle more effectively"],
    answer:`Students can reduce waste and recycle more effectively at school by:

• Using clearly labeled bins
• Bringing reusable water bottles
• Avoiding single-use plastics
• Printing less and using both sides of paper
• Creating a student recycling team
• Composting organic waste from the cafeteria if possible

What is one realistic recycling action your class could start this week?`
  },
  {
    keys:["plastic after it is recycled","recycled plastic"],
    answer:`After plastic is collected, it is sorted, cleaned, shredded into flakes, melted, and turned into pellets. These pellets can be used to make new products such as bottles, containers, textiles, or outdoor furniture.

However, plastic quality can decrease after repeated recycling, so reducing plastic use is still very important.

Why is reducing plastic better than only recycling it?`
  },
  {
    keys:["organic waste","compost","food waste"],
    answer:`Organic waste can contribute to recycling through composting. Food scraps, fruit peels, leaves, and garden waste can break down into compost, a nutrient-rich material that improves soil quality.

Benefits:
• Reduces landfill waste
• Lowers methane emissions
• Supports healthier soil
• Helps plants grow

Could a school garden use compost from cafeteria waste?`
  },
  {
    keys:["environmental damages of plastic waste","plastic waste","plastic pollution"],
    answer:`Plastic waste harms the environment because it lasts for a very long time and can break into microplastics.

Main damages:
• Animals may eat plastic or become trapped in it.
• Microplastics can enter food chains.
• Plastic can pollute rivers, seas, and beaches.
• Burning plastic can release harmful gases.

What can people do before plastic reaches rivers and oceans?`
  },
  {
    keys:["reduce household waste","improve recycling habits","household waste"],
    answer:`The most effective ways to reduce household waste are:

• Buy only what you need.
• Use reusable bags, bottles, and containers.
• Choose products with less packaging.
• Repair items instead of replacing them.
• Separate recyclables correctly.
• Compost organic waste if possible.

Which of these habits would be easiest for a family to start?`
  },
  {
    keys:["why is waste separation important","waste separation important"],
    answer:`Waste separation is important because it keeps recyclable materials clean and useful. It also prevents hazardous materials, such as batteries, from damaging the environment.

Benefits:
• More materials can be recycled.
• Less waste goes to landfills.
• Soil and water pollution can be reduced.
• Energy and raw materials can be saved.

What might happen if food waste is mixed with clean paper?`
  },
  {
    keys:["plastic in the sea","see plastic in the sea"],
    answer:`If you see plastic in the sea, do not put yourself in danger. If it is safe, you can remove it and place it in the correct waste bin. You can also report larger pollution to local authorities or environmental groups.

Helpful actions:
• Join beach clean-up events.
• Avoid single-use plastics.
• Encourage others not to litter.

Why is prevention more effective than cleaning plastic after it reaches the sea?`
  },
  {
    keys:["summer drought","save water during summer","water consumption at school","save water daily","save water","conserving water important","water conservation"],
    answer:`Conserving water is important because freshwater is limited and droughts can reduce water availability for people, agriculture, and ecosystems.

Ways to save water:
• Turn off taps while brushing teeth.
• Fix leaks quickly.
• Use water-efficient devices.
• Water plants early in the morning or evening.
• Collect rainwater where possible.
• At school, report leaking taps and avoid unnecessary water use.

How could your school reduce water waste this month?`
  },
  {
    keys:["sustainable fishing","overfishing","protect fish populations"],
    answer:`Sustainable fishing means catching fish in a way that allows fish populations to recover and marine ecosystems to stay healthy.

Overfishing is harmful because:
• Fish populations decline.
• Food chains are disrupted.
• Marine biodiversity decreases.
• Coastal communities may lose food and income.

Protection methods include fishing limits, protected areas, seasonal bans, and avoiding illegal fishing.

Why should young fish be allowed to grow before being caught?`
  },
  {
    keys:["coral bleaching","marine ecosystem"],
    answer:`Coral bleaching happens when corals lose the algae that live inside them, often because the water is too warm. Without these algae, corals lose color and energy.

Effects on marine ecosystems:
• Fish lose shelter and breeding areas.
• Biodiversity decreases.
• Coastal protection becomes weaker.
• Tourism and fisheries may suffer.

How is coral bleaching connected to climate change?`
  },
  {
    keys:["most polluted ocean","which ocean is the most polluted"],
    answer:`Pollution levels can vary depending on the type of pollution measured, such as plastic, oil, chemicals, or sewage. Some ocean regions, especially near dense populations and major rivers, are heavily polluted.

A better question is often: Which ocean areas are most affected by human activity? Coastal zones, enclosed seas, and ocean gyres that collect plastic are especially vulnerable.

Why do plastics often gather in certain ocean regions?`
  },
  {
    keys:["biggest threats facing the world's oceans","threats facing the world’s oceans","human-induced factors threatening the ocean","ocean ecosystem"],
    answer:`The biggest threats to the world's oceans include:

• Plastic pollution
• Overfishing
• Climate change and warming seas
• Ocean acidification
• Oil spills and chemical pollution
• Habitat destruction
• Sewage and agricultural runoff

Most of these threats are caused or intensified by human activities.

Which ocean threat do you think is easiest for students to help reduce?`
  },
  {
    keys:["plastic pollution affect marine life","marine life","keeping the oceans clean","plastic bags out of the ocean"],
    answer:`Plastic pollution affects marine life in several ways. Animals can swallow plastic, become trapped in it, or mistake microplastics for food.

Keeping oceans clean helps:
• Protect fish, seabirds, turtles, and marine mammals
• Keep food chains healthier
• Preserve habitats such as coral reefs and seagrass beds
• Support people who depend on fishing and tourism

How can reducing plastic bags on land protect animals in the sea?`
  },
  {
    keys:["underground water","groundwater","contaminating underground water"],
    answer:`Contaminating underground water is dangerous because groundwater is an important source of drinking water and irrigation.

Bad effects:
• Drinking water may become unsafe.
• Toxic substances can spread slowly underground.
• Soil and crops may be affected.
• Cleaning polluted groundwater is difficult and expensive.

Why is prevention especially important for groundwater pollution?`
  },
  {
    keys:["countries work together","protect the oceans"],
    answer:`Countries can work together to protect oceans by:

• Creating international agreements
• Reducing plastic waste and pollution
• Controlling illegal fishing
• Protecting marine areas
• Sharing scientific data
• Supporting clean technologies and waste management

Oceans are connected, so pollution in one region can affect other regions.

Why do ocean problems require international cooperation?`
  },
  {
    keys:["biodiversity important","what is biodiversity","decline of biodiversity","biodiversity loss","threats to biodiversity","pollution impact ecosystems","rainforests important","floods influence river"],
    answer:`Biodiversity is the variety of living things, genes, species, and ecosystems on Earth.

Why it matters:
• It keeps ecosystems stable.
• It supports food, medicine, clean water, and soil fertility.
• It helps ecosystems recover from change.
• It contributes to climate stability.

Major threats include habitat loss, pollution, climate change, invasive species, overuse of natural resources, and deforestation.

How might human life change if pollinators such as bees declined sharply?`
  },
  {
    keys:["endemic species","endangered endemic","where are endemic","protect endemic"],
    answer:`An endemic species is a species that naturally lives only in a specific geographic area.

Endemic species are important because:
• They add unique value to biodiversity.
• They can show how special a local ecosystem is.
• If they disappear from that region, they may disappear from the world.

They can become endangered through habitat loss, pollution, climate change, illegal hunting, invasive species, or overuse of resources.

Why are islands and isolated habitats often rich in endemic species?`
  },
  {
    keys:["salt from seawater","seawater was completely removed"],
    answer:`If the salt were completely removed from seawater, marine ecosystems would change dramatically. Many ocean organisms are adapted to salty water. A sudden change in salinity would affect fish, plankton, corals, and marine food chains.

It would also change ocean density and circulation, which help regulate climate.

Why do marine animals need stable water conditions to survive?`
  },
  {
    keys:["illegal logging","coal heating","mitigation and adaptation","communities adapt","permafrost","polar bears","arctic animals","green technology","agriculture and food security","climate change happening faster","biggest cause of climate change","co2 emissions","natural disasters","global warming felt more strongly","greenhouse gases","renewable energy reduce global warming","climate change affect animals","stop climate change","human activities contributing to climate change","clean water"],
    answer:`Climate change is mainly driven by human activities that increase greenhouse gases in the atmosphere.

Main causes:
• Burning fossil fuels such as coal, oil, and gas
• Deforestation and illegal logging
• Industrial production
• Transportation
• Intensive agriculture and land-use change

Effects:
• More heatwaves, droughts, floods, and wildfires
• Melting ice and permafrost
• Habitat loss for polar bears and Arctic animals
• Lower agricultural productivity in some regions
• Reduced access to clean water

Mitigation means reducing the causes of climate change, such as cutting emissions. Adaptation means preparing for impacts, such as improving water management or protecting cities from floods.

Which is more urgent in your community: mitigation or adaptation?`
  },
  {
    keys:["energy storage","batteries help store renewable energy","challenges of energy storage","energy stored","technologies are used to store energy"],
    answer:`Energy storage is important because renewable energy sources such as solar and wind do not produce the same amount of energy all the time.

Storage helps by:
• Saving extra energy for later
• Balancing supply and demand
• Making renewable energy more reliable
• Reducing dependence on fossil fuels

Storage technologies include batteries, pumped hydropower, thermal storage, hydrogen, and flywheels.

Why might solar energy need storage at night?`
  },
  {
    keys:["cheap and doesn't harm the environment","teenagers save energy","reduce energy consumption at school","renewable energy sources","smart thermostats","energy-efficient devices","public transportation","communities reduce energy waste","clean energy important","prefer fossil fuels"],
    answer:`Clean energy is important because it reduces air pollution, greenhouse gas emissions, and dependence on limited fossil fuels.

Main renewable sources:
• Solar energy
• Wind energy
• Hydroelectric energy
• Geothermal energy
• Biomass when managed sustainably

Ways to save energy:
• Turn off unused lights and devices.
• Use energy-efficient appliances.
• Improve insulation.
• Use public transportation, cycling, or walking.
• At school, monitor heating, cooling, and lighting.

Some people still prefer fossil fuels because they can be cheap, familiar, and supported by existing infrastructure. However, their environmental costs are high.

What is one energy-saving action your school could take immediately?`
  },
  {
    keys:["food chain","food web","energy pyramid","energy flow","biotic","abiotic","ecosystem"],
    answer:`An ecosystem includes living and non-living parts.

Biotic factors are living things such as plants, animals, fungi, and microorganisms. Abiotic factors are non-living conditions such as water, light, temperature, air, and soil.

Energy flows from producers to consumers in food chains and food webs. In an energy pyramid, only about 10% of energy passes to the next level, while much is lost as heat.

Why are producers such as plants essential for most ecosystems?`
  }
];

function el(id){return document.getElementById(id)}

function normalize(text){
  return (text || "").toLowerCase().replace(/[“”"]/g,"").replace(/[!?.,:;]/g," ").replace(/\s+/g," ").trim();
}

function localAnswer(message){
  const q = normalize(message);
  const found = answers.find(item => item.keys.some(k => q.includes(k)));
  if(found) return found.answer;

  return `I may not be able to help directly with that topic. I can help you with:

• Recycling & Waste
• Water & Oceans
• Climate Change
• Biodiversity
• Energy
• Ecosystems and food chains
• Environmental awareness and sustainability

Please ask a question related to one of these topics.`;
}

function addMessage(role, text){
  const row = document.createElement("div");
  row.className = "msgrow " + role;

  if(role === "bot"){
    const img = document.createElement("img");
    img.className = "avatar";
    img.src = logo;
    img.alt = "EcoBot";
    row.appendChild(img);
  }

  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.innerHTML = role === "bot"
    ? '<span class="name">EcoBot</span>' + escapeHTML(text)
    : escapeHTML(text);
  row.appendChild(bubble);
  el("messages").appendChild(row);
  el("messages").scrollTop = el("messages").scrollHeight;
}

function escapeHTML(str){
  return String(str).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br>");
}

function welcome(){
  addMessage("bot", `Hello! 👋 I am EcoBot.

I can help you explore environmental topics in English:

• Recycling & Waste
• Water & Oceans
• Climate Change
• Biodiversity
• Energy
• Ecosystems and sustainability

What would you like to learn today?`);
}

function clearChat(){
  history = [];
  el("messages").innerHTML = "";
  welcome();
}

function askQuick(text){
  el("input").value = text;
  sendMessage();
}

function handleKey(event){
  if(event.key === "Enter" && !event.shiftKey){
    event.preventDefault();
    sendMessage();
  }
}

async function sendMessage(){
  const input = el("input");
  const text = input.value.trim();
  if(!text) return;

  addMessage("user", text);
  history.push({role:"user", content:text});
  input.value = "";
  el("send").disabled = true;

  try{
    let answer = "";
    if(endpoint){
      answer = await askAI(text);
    } else {
      answer = localAnswer(text);
    }
    addMessage("bot", answer);
    history.push({role:"assistant", content:answer});
  } catch(err){
    const fallback = "I could not connect to the AI service, so I am answering in local education mode.\n\n" + localAnswer(text);
    addMessage("bot", fallback);
  } finally {
    el("send").disabled = false;
    input.focus();
  }
}

async function askAI(message){
  const response = await fetch(endpoint, {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      system:SYSTEM_PROMPT,
      message,
      history:history.slice(-8)
    })
  });
  if(!response.ok) throw new Error("Endpoint error");
  const data = await response.json();
  return data.answer || data.text || localAnswer(message);
}

function openSettings(){
  el("endpoint").value = endpoint;
  el("settingsDialog").showModal();
}

function closeSettings(){
  el("settingsDialog").close();
}

function saveSettings(){
  endpoint = el("endpoint").value.trim();
  localStorage.setItem("ecobot_endpoint", endpoint);
  closeSettings();
}

document.querySelectorAll(".grade-toggle").forEach(btn => {
  btn.addEventListener("click", () => {
    const panel = btn.nextElementSibling;
    panel.classList.toggle("open");
    const span = btn.querySelector("span");
    if(span) span.textContent = panel.classList.contains("open") ? "▾" : "▸";
  });
});

const resizer = el("resizer");
let resizing = false;
resizer.addEventListener("mousedown", () => resizing = true);
window.addEventListener("mouseup", () => resizing = false);
window.addEventListener("mousemove", e => {
  if(!resizing) return;
  const width = Math.max(260, Math.min(430, e.clientX - el("app").getBoundingClientRect().left));
  document.documentElement.style.setProperty("--side", width + "px");
});

welcome();
