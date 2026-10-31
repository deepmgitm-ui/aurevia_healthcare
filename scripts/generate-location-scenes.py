from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "location-scenes"
OUT.mkdir(parents=True, exist_ok=True)

scenes = {
    "chandigarh": {
        "sky": ("#dcece4", "#f7ebd6"), "hill": "#9eb8a6", "far": "#bccdbb", "water": "#8eb8a8", "accent": "#c58a55", "label": "CHANDIGARH · GARDEN CITY",
        "landmark": '''<g transform="translate(610 280)" fill="#e8dfc9"><path d="M-155 370V190h310v180z"/><path d="M-178 190h356l-34-35h-288z"/><path d="M-145 155l145-100 145 100z"/><path d="M-112 175v-38h30v38zm65 0v-58h32v58zm65 0v-58h32v58zm65 0v-38h30v38z" fill="#bd9d73"/><path d="M-170 370h340v18h-340z" fill="#ad9470"/></g><g transform="translate(265 340)" fill="#dbd5c2"><path d="M0 300V70q0-35 30-35t30 35v230z"/><path d="M-10 74h80l-15-24H5z"/><path d="M10 35q20-28 40 0z"/></g><g transform="translate(835 330)" fill="#d9d4c2"><path d="M0 310V100h58v210z"/><path d="M-9 105h76L55 82H3z"/><path d="M11 82q18-27 36 0z"/></g>''',
        "foreground": '''<path d="M0 770Q300 700 600 760t600 0v140H0z" fill="#789c81"/><path d="M0 815Q250 780 600 820t600-10v90H0z" fill="#648a70"/>''',
    },
    "delhi-ncr": {
        "sky": ("#ead9ce", "#f9e9d4"), "hill": "#bd8e78", "far": "#d5b9a4", "water": "#a96450", "accent": "#8d4c3c", "label": "DELHI NCR · CAPITAL REGION",
        "landmark": '''<g transform="translate(600 300)" fill="#bd7858"><path d="M-205 340V120q0-150 205-150t205 150v220z"/><path d="M-235 130h470v25h-470z" fill="#a9634b"/><path d="M-178 105q0-115 178-115t178 115h-38q0-78-140-78t-140 78z" fill="#d79570"/><path d="M-68 340V205q0-68 68-68t68 68v135z" fill="#784b42"/><path d="M-154 205v-52h25v52zm282 0v-52h25v52z" fill="#784b42"/><path d="M-8 0v-54h16V0z" fill="#a9634b"/></g><g fill="#657c66"><path d="M100 520h38v235h-38z"/><circle cx="119" cy="480" r="95"/><path d="M1040 510h34v245h-34z"/><circle cx="1057" cy="466" r="88"/></g>''',
        "foreground": '''<path d="M0 760q300-35 600 0t600 0v140H0z" fill="#c0a28b"/><path d="M0 825q350-40 720 0t480-5v80H0z" fill="#a98470"/>''',
    },
    "ghaziabad": {
        "sky": ("#d8ebe4", "#f5e8d5"), "hill": "#8eaa9a", "far": "#afc7b9", "water": "#74a9a2", "accent": "#d08b58", "label": "GHAZIABAD · HINDON RIVERFRONT",
        "landmark": '''<g fill="#e2e4d8"><path d="M160 560V300h90v260z"/><path d="M270 560V230h125v330z"/><path d="M415 560V340h88v220z"/><path d="M525 560V200h132v360z"/><path d="M675 560V290h102v270z"/><path d="M800 560V250h150v310z"/><path d="M965 560V355h90v205z"/></g><g fill="#82aaa0"><path d="M183 330h14v16h-14zm30 0h14v16h-14zm75-65h20v24h-20zm42 0h20v24h-20zm42 0h20v24h-20zm190-35h20v25h-20zm45 0h20v25h-20zm45 0h20v25h-20zm160 55h20v22h-20zm42 0h20v22h-20zm42 0h20v22h-20z"/></g><path d="M0 660q280-60 600 0t600 0" fill="none" stroke="#f4efe1" stroke-width="16"/><path d="M0 680q280-60 600 0t600 0v220H0z" fill="#74a9a2"/>''',
        "foreground": '''<path d="M0 790q280-45 600 0t600 0v110H0z" fill="#668e79"/><path d="M0 835q250-30 600 0t600 0v65H0z" fill="#557d68"/>''',
    },
    "noida": {
        "sky": ("#d5e9ef", "#f7ecd8"), "hill": "#88a9aa", "far": "#afc7ca", "water": "#7eacba", "accent": "#4388a0", "label": "NOIDA · EXPRESSWAY SKYLINE",
        "landmark": '''<g fill="#cbdfe1"><path d="M145 610V305h100v305z"/><path d="M270 610V205h118v405z"/><path d="M410 610V335h92v275z"/><path d="M520 610V155h155v455z"/><path d="M700 610V275h112v335z"/><path d="M838 610V220h145v390z"/><path d="M1005 610V350h92v260z"/></g><g fill="#5e97a4"><path d="M165 335h22v68h-22zm43 0h22v68h-22zm88-88h25v70h-25zm48 0h25v70h-25zm48 0h25v70h-25zm153-54h28v70h-28zm53 0h28v70h-28zm54 0h28v70h-28zm90 112h24v66h-24zm46 0h24v66h-24zm46 0h24v66h-24zm87-58h25v70h-25zm49 0h25v70h-25zm48 0h25v70h-25z"/></g><path d="M0 680h1200" stroke="#668693" stroke-width="18"/><path d="M0 699q230-30 480 3t720-5" fill="none" stroke="#f3f0e6" stroke-width="8"/>''',
        "foreground": '''<path d="M0 780q300-25 600 0t600-5v120H0z" fill="#81a99e"/><path d="M0 830q350-25 700 0t500-5v75H0z" fill="#638f87"/>''',
    },
    "mumbai": {
        "sky": ("#d8e8e8", "#f8d9c2"), "hill": "#879fa0", "far": "#b2c6c5", "water": "#76aab1", "accent": "#c96e69", "label": "MUMBAI · ARABIAN SEA",
        "landmark": '''<g fill="#9eaaa5"><path d="M65 570V310h100v260z"/><path d="M180 570V230h110v340z"/><path d="M305 570V340h76v230z"/><path d="M850 570V285h90v285z"/><path d="M955 570V205h145v365z"/><path d="M1115 570V330h65v240z"/></g><g fill="#e8d9c4"><path d="M90 340h16v45H90zm38 0h16v45h-16zm82-78h20v48h-20zm45 0h20v48h-20zm618 55h20v48h-20zm39 0h20v48h-20zm79-80h25v55h-25zm48 0h25v55h-25z"/></g><path d="M120 730Q330 560 560 655T1200 640" fill="none" stroke="#e8eee5" stroke-width="22"/><path d="M120 730Q330 560 560 655T1200 640" fill="none" stroke="#a96b5d" stroke-width="8"/><g stroke="#a96b5d" stroke-width="4"><path d="M250 665V580m90 18V550m100 64V545m100 101V563m110 112V580m110 75V557m100 67V540m100 63V520"/></g>''',
        "foreground": '''<path d="M0 700q250-35 510 5t690-5v200H0z" fill="#76aab1"/><path d="M0 790q210-35 420 0t780 0" fill="none" stroke="#a7c9c4" stroke-width="8"/><path d="M0 840q250-25 550 8t650-8v60H0z" fill="#5f929c"/>''',
    },
    "bangalore": {
        "sky": ("#dcecdf", "#f5edd6"), "hill": "#91b09b", "far": "#b6cdb3", "water": "#82aaa0", "accent": "#55835c", "label": "BENGALURU · GARDEN CITY",
        "landmark": '''<g transform="translate(600 315)" fill="#d6c7a3"><path d="M-245 310V115h490v195z"/><path d="M-270 120h540l-38-32h-464z"/><path d="M-215 88l215-88 215 88z"/><path d="M-192 300V180h68v120zm110 0V155h74v145zm108 0V155h74v145zm111 0V180h68v120z" fill="#526b5c"/><path d="M-46 310V220q0-48 46-48t46 48v90z" fill="#526b5c"/><path d="M-240 318h480v18h-480z" fill="#aa9875"/></g><g fill="#617f61"><path d="M90 570h30v185H90z"/><circle cx="105" cy="530" r="78"/><path d="M1030 570h32v185h-32z"/><circle cx="1046" cy="525" r="86"/><path d="M880 590h26v165h-26z"/><circle cx="894" cy="552" r="62"/></g><g fill="#d9e3d3"><path d="M340 495V335h70v160z"/><path d="M430 495V255h86v240z"/><path d="M530 495V365h60v130z"/><path d="M625 495V285h90v210z"/><path d="M730 495V340h68v155z"/></g><g fill="#73a18a"><path d="M450 285h16v26h-16zm34 0h16v26h-16zm-34 45h16v26h-16zm34 0h16v26h-16zm165-22h18v28h-18zm38 0h18v28h-18z"/></g>''',
        "foreground": '''<path d="M0 770q300-45 600 0t600-5v135H0z" fill="#729879"/><path d="M0 830q280-35 600 0t600-5v75H0z" fill="#587c63"/>''',
    },
    "pune": {
        "sky": ("#e5e2f0", "#f8e9d8"), "hill": "#9696b2", "far": "#bdb9cb", "water": "#91a6aa", "accent": "#8065a0", "label": "PUNE · DECCAN HERITAGE",
        "landmark": '''<path d="M0 500Q220 280 435 495t380-15 385 0v180H0z" fill="#879a86"/><g transform="translate(600 315)" fill="#c4a67c"><path d="M-255 300V75h510v225z"/><path d="M-285 82h570l-37-45h-496z"/><path d="M-235 36l235-128 235 128z"/><path d="M-186 296V160h75v136zm111 0V130h78v166zm113 0V130h78v166zm111 0V160h75v136z" fill="#684e4d"/><path d="M-40 300V216q0-40 40-40t40 40v84z" fill="#684e4d"/><path d="M-264 305h528v22h-528z" fill="#93704f"/></g><g fill="#617e65"><circle cx="135" cy="465" r="68"/><circle cx="1050" cy="455" r="80"/></g>''',
        "foreground": '''<path d="M0 730q250-50 500 5t700-5v170H0z" fill="#87a18c"/><path d="M0 835q300-40 650 0t550-5v70H0z" fill="#6d8c76"/>''',
    },
    "telangana": {
        "sky": ("#ded9e9", "#f6dfc4"), "hill": "#827f96", "far": "#aaa5b7", "water": "#8c94a2", "accent": "#a76e75", "label": "HYDERABAD · DECCAN HERITAGE",
        "landmark": '''<g transform="translate(600 265)" fill="#c5a889"><path d="M-150 420V130h300v290z"/><path d="M-174 138l174-92 174 92z"/><path d="M-205 120v-24q0-70 47-70t47 70v24h-25v-24q0-42-22-42t-22 42v24zm136 0v-36q0-76 69-76t69 76v36h-27v-36q0-48-42-48t-42 48v36zm204 0v-24q0-70 47-70t47 70v24h-25v-24q0-42-22-42t-22 42v24z"/><path d="M-48 420V278q0-50 48-50t48 50v142z" fill="#73575c"/><path d="M-122 220v-44h25v44zm194 0v-44h25v44z" fill="#73575c"/></g><circle cx="600" cy="530" r="7" fill="#efcf91"/><g fill="#6f7a70"><path d="M105 570h28v188h-28z"/><circle cx="119" cy="530" r="72"/><path d="M1050 565h30v193h-30z"/><circle cx="1065" cy="515" r="78"/></g>''',
        "foreground": '''<path d="M0 760q250-30 550 0t650-5v140H0z" fill="#817f87"/><path d="M0 835q300-38 650 0t550-5v70H0z" fill="#6b7079"/>''',
    },
    "ahmedabad": {
        "sky": ("#eee2cc", "#f9e8ce"), "hill": "#aa9879", "far": "#cbbc9e", "water": "#83a9a3", "accent": "#b47342", "label": "AHMEDABAD · SABARMATI RIVERFRONT",
        "landmark": '''<g fill="#b6875c"><path d="M180 550V355h350v195z"/><path d="M155 360h400l-32-30H187z"/><path d="M220 330l135-90 135 90z"/><path d="M228 520V402h55v118zm86 0V385h63v135zm103 0V385h63v135zm93 0V402h55v118z" fill="#74584a"/><path d="M570 550V390h88v160z"/><path d="M675 550V330h114v220z"/><path d="M807 550V410h68v140z"/></g><g fill="#829992"><path d="M706 372h18v42h-18zm36 0h18v42h-18z"/></g><path d="M0 630q320-45 600 0t600-5v270H0z" fill="#83a9a3"/><path d="M0 675q300-25 600 0t600 0" fill="none" stroke="#d7d2bd" stroke-width="18"/><path d="M0 700q300-25 600 0t600 0" fill="none" stroke="#f6f0df" stroke-width="5"/>''',
        "foreground": '''<path d="M0 800q280-25 600 0t600-5v100H0z" fill="#73968f"/><path d="M0 850q330-20 650 0t550-5v55H0z" fill="#5e817e"/>''',
    },
}

def render(slug, s):
    sky1, sky2 = s["sky"]
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900" fill="none">
<defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="900" gradientUnits="userSpaceOnUse"><stop stop-color="{sky1}"/><stop offset="1" stop-color="{sky2}"/></linearGradient><linearGradient id="veil" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff" stop-opacity=".13"/><stop offset="1" stop-color="#20394a" stop-opacity=".1"/></linearGradient></defs>
<rect width="1200" height="900" fill="url(#sky)"/><circle cx="930" cy="170" r="76" fill="#fff5df" opacity=".58"/><path d="M0 500Q210 390 410 500t410-2 380-1v220H0z" fill="{s['hill']}" opacity=".58"/><path d="M0 555Q230 460 450 550t400 1 350-12v180H0z" fill="{s['far']}" opacity=".62"/>
{s['landmark']}
{s['foreground']}
<path d="M0 735q175-72 350 0t350 0 350 0 150 0v165H0z" fill="{s['water']}" opacity=".28"/><path d="M70 620q9-7 18 0m35-27q9-7 18 0m900-8q9-7 18 0" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".62"/>
<rect width="1200" height="900" fill="url(#veil)"/><rect x="38" y="38" width="1124" height="824" rx="34" stroke="#fff" stroke-opacity=".5" stroke-width="2"/><rect x="74" y="75" width="8" height="42" rx="4" fill="{s['accent']}"/><text x="100" y="104" fill="#27414a" font-family="Arial,sans-serif" font-size="18" font-weight="700" letter-spacing="3">{s['label']}</text><text x="1100" y="812" fill="#fff" font-family="Arial,sans-serif" font-size="16" font-weight="700" letter-spacing="4" text-anchor="end">AUREVIA · INDIA</text>
</svg>'''
    (OUT / f"{slug}.svg").write_text(svg, encoding="utf-8")

for slug, scene in scenes.items():
    render(slug, scene)

print(f"Generated {len(scenes)} location scenes in {OUT}")
