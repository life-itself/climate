# B Wind II

## The physics of wind power

![](/img/without-hot-air/figure332.gif)

miles/
hour

km/h

m/s

Beaufort
scale

2.2

3.6

1

force 1

7

11

3

force 2

11

18

5

force 3

13

21

6

force 4

16

25

7

22

36

10

force 5

29

47

13

force 6

36

58

16

force 7

42

68

19

force 8

49

79

22

force 9

60

97

27

force 10

69

112

31

force 11

78

126

35

force 12

<span class="figurenumber">Figure B.1.</span> Speeds.

I’m using this formula again:
 mass = density × volume

To estimate the energy in wind, let’s imagine holding up a hoop with area *A*, facing the wind whose speed is *v*. Consider the mass of air that passes through that hoop in one second. Here’s a picture of that mass of air just before it passes through the hoop:

![](/img/without-hot-air/figure501.gif)

And here’s a picture of the same mass of air one second later:

![](/img/without-hot-air/figure502.gif)

The mass of this piece of air is the product of its density *ρ*, its area *A*, and its length, which is *v* times *t*, where *t* is one second.

![](/img/without-hot-air/figure503.gif)

The kinetic energy of this piece of air is

[\begin{matrix}
{\frac{1}{2}mv^{2} = \frac{1}{2}\rho Avt\ v^{2} = \frac{1}{2}\rho Atv^{3}} \\
\end{matrix}]

So the power of the wind, for an area *A* – that is, the kinetic energy passing across that area per unit time – is

[\begin{matrix}
{\frac{\frac{1}{2}mv^{2}}{t} = \frac{1}{2}\rho Av^{3}} \\
\end{matrix}]

This formula may look familiar – we derived an identical expression when we were discussing the power requirement of a moving car.

What’s a typical wind speed? On a windy day, a cyclist really notices the wind direction; if the wind is behind you, you can go much faster than normal; the speed of such a wind is therefore comparable to the typical speed of the cyclist, which is, let’s say, 21 km per hour (13 miles per hour, or 6 metres per second). In Cambridge, the wind is only occasionally this big. Nevertheless, let’s use this as a typical British figure (and bear in mind that we may need to revise our estimates).

![](/img/without-hot-air/figure260.gif)

<span class="figurenumber">Figure B.2.</span> Flow of air past a windmill. The air is slowed down and splayed out by the windmill.

![](/img/without-hot-air/figure264.gif)

<span class="figurenumber">Figure B.3.</span> The Brooklyn windmill above Wellington, New Zealand, with people providing a scale at the base. On a breezy day, this windmill was producing 60 kW, (1400 kWh per day). Photo by Philip Banks.

The density of air is about 1.3 kg per m<sup>3</sup>. (I usually round this to 1 kg per m<sup>3</sup>, which is easier to remember, although I haven’t done so here.) Then the typical power of the wind per square metre of hoop is

[\begin{matrix}
{\frac{1}{2}\rho v^{3} = \frac{1}{2} \times \text{1.3\ kg/}\text{m}^{\text{3}} \times \left( \text{6\ m/s} \right)^{\text{3}} = \text{140\ W/}\text{m}^{\text{2}}} \\
\end{matrix}]

Not all of this energy can be extracted by a windmill. The windmill slows the air down quite a lot, but it has to leave the air with *some* kinetic energy, otherwise that slowed-down air would get in the way. Figure B.2 is a cartoon of the actual flow past a windmill. The maximum fraction of the incoming energy that can be extracted by a disc-like windmill was worked out by a German physicist called Albert Betz [<span class="darkred">[1]</span>](#chBn01) in 1919. If the departing wind speed is one third of the arriving wind speed, the power extracted is 16/27 of the total power in the wind. 16/27 is 0.59. In practice let’s guess that a windmill might be 50% efficient. In fact, real windmills are designed with particular wind speeds in mind; if the wind speed is significantly greater than the turbine’s ideal speed, it has to be switched off.

As an example, let’s assume a diameter of *d* = 25m, and a hub height of 32 m, which is roughly the size of the lone windmill above the city of Wellington, New Zealand (figure B.3). The power of a single windmill is

[\begin{matrix}
 \\
{= \text{50\%} \times \frac{1}{2}\rho v^{3} \times \frac{1}{4}\pi d^{2}} \\
{= \text{50\%} \times \text{140\ W/m}^{\text{2}} \times \frac{1}{4}\pi\left( \text{25\ m} \right)^{2}} \\
{= \text{34\ kW}} \\
\end{matrix}]

Indeed, when I visited this windmill on a very breezy day, its meter showed it was generating 60 kW.

To estimate how much power we can get from wind, we need to decide how big our windmills are going to be, and how close together we can pack them.

How densely could such windmills be packed? Too close and the upwind ones will cast wind-shadows on the downwind ones. Experts say that windmills can’t be spaced closer than 5 times their diameter without losing significant power. At this spacing, the <span id="power">power</span> that windmills can generate per unit land area is

[\begin{matrix}
 \\
{= \frac{\frac{1}{2}\rho v^{3}\frac{\pi}{8}d^{2}}{\left( 5d \right)^{2}}} \\
{= \frac{\pi}{200}\frac{1}{2}\rho v^{3}} \\
{= 0.016 \times 140\text{W/m}^{\text{2}}} \\
{= 2.2\text{W/m}^{\text{2}}} \\
\end{matrix}]

![](/img/without-hot-air/figure265.gif)

<span class="figurenumber">Figure B.4.</span> Wind farm layout.

This number is worth remembering: a wind farm with a wind speed of 6 m/s produces a power of 2 W per m<sup>2</sup> of land area. Notice that our answer does not depend on the diameter of the windmill. The *ds* cancelled because bigger windmills have to be spaced further apart. Bigger windmills might be a good idea in order to catch bigger windspeeds that exist higher up (the taller a windmill is, the bigger the wind speed it encounters), or because of economies of scale, but those are the only reasons for preferring big windmills.

Power per unit area

wind farm (speed 6 m/s)

2 W/m<sup>2</sup>

<span class="figurenumber">Table B.5.</span> Facts worth remembering: wind farms.

This calculation depended sensitively on our estimate of the windspeed. Is 6 m/s plausible as a long-term typical windspeed in windy parts of Britain? Figures 4.1 and 4.2 showed windspeeds in Cambridge and Cairngorm. Figure B.6 shows the mean winter and summer windspeeds in eight more locations around Britain. I fear 6 m/s was an overestimate of the typical speed in most of Britain\! If we replace 6 m/s by Bedford’s 4 m/s as our estimated windspeed, we must scale our estimate down, multiplying it by (4/6)<sup>3</sup>≅ 0.3. (Remember, wind power scales as wind-speed cubed.)

![](/img/without-hot-air/figure261.gif)

<span class="figurenumber">Figure B.6.</span> Average summer windspeed (dark bar) and average winter windspeed (light bar) in eight locations around Britain. Speeds were measured at the standard weatherman’s height of 10 metres. Averages are over the period 1971–2000.

On the other hand, to estimate the typical power, we shouldn’t take the mean wind speed and cube it; rather, we should find the mean cube of the windspeed. The average of the cube is bigger than the cube of the average. But if we start getting into these details, things get even more complicated, because real wind turbines don’t actually deliver a power proportional to wind-speed cubed. Rather, they typically have just a range of wind-speeds within which they deliver the ideal power; at higher or lower speeds real wind turbines deliver less than the ideal power.

### Variation of wind speed with height

![](/img/without-hot-air/figure266.gif)

<span class="figurenumber">Figure B.7.</span> Top: Two models of wind speed and wind power as a function of height. DWIA = Danish Wind Industry Association; NREL = National Renewable Energy Laboratory. For each model the speed at 10 m has been fixed to 6 m/s. For the Danish Wind model, the roughness length is set to *z*<span class="smallfont2"><sub>0</sub></span> = 0.1 m. Bottom: The power density (the power per unit of upright area) according to each of these models.

Taller windmills see higher wind speeds. The way that wind speed increases with height is complicated and depends on the roughness of the surrounding terrain and on the time of day. As a ballpark figure, doubling the height typically increases wind-speed by 10% and thus increases the power of the wind by 30%.

Some standard formulae for speed *v* as a function of height *z* are:

1.  According to the wind shear formula from NREL [[<span class="websitetitle">ydt7uk</span>](http://tinyurl.com/ydt7uk)], the speed varies as a power of the height: [v\text{(}z\text{)} = v_{10}\left( \frac{z}{\text{10\ m}} \right)^{\alpha}\text{,}] where \(v_{10}\) is the speed at 10 m, and a typical value of the exponent α is 0.143 or 1/7. The one-seventh law (*v*(*z*) is proportional to \(z^{\text{1/7}}\) ) is used by Elliott et al. (1991), for example.
2.  The wind shear formula from the Danish Wind Industry Association [[<span class="websitetitle">yaoonz</span>](http://tinyurl.com/yaoonz)] is [v\text{(}z\text{)} = v_{\text{ref}}\frac{\text{log}\left( {z/z_{0}} \right)}{\text{log}\left( {z_{\text{ref}}/z_{0}} \right)}\text{,}] where *z*<sub>0</sub> is a parameter called the roughness length, and *v*<sub>ref</sub> is the speed at a reference height *z*<sub>ref</sub> such as 10 m. The roughness length for typical countryside (agricultural land with some houses and sheltering hedgerows with some 500-m intervals – "roughness class 2") is *z*<sub>0</sub> = 0.1 m.

In practice, these two wind shear formulae give similar numerical answers. That’s not to say that they are accurate at all times however. Van den Berg (2004) suggests that different wind profiles often hold at night.

![](/img/without-hot-air/figure262.gif)

<span class="figurenumber">Figure B.8.</span> The qr5 from [<span class="websitetitle">quietrevolution.co.uk</span>](http://www.quietrevolution.com). Not a typical windmill.

### Standard windmill properties

The typical windmill of today has a rotor diameter of around 54 metres centred at a height of 80 metres; such a machine has a "capacity" of 1 MW. The "capacity" or "peak power" is the *maximum* power the windmill can generate in optimal conditions. Usually, wind turbines are designed to start running at wind speeds somewhere around 3 to 5 m/s and to stop if the wind speed reaches gale speeds of 25 m/s. [<span class="darkred">[2]</span>](#chBn02) The actual average power delivered is the "capacity" multiplied by a factor that describes the fraction of the time that wind conditions are near optimal. This factor, sometimes called the "load factor" or "capacity factor," depends on the site; a typical load factor for a good site in the UK is 30%. [<span class="darkred">[3]</span>](#chBn03) In the Netherlands, the typical load factor is 22%; in Germany, it is 19%.

### Other people’s estimates of wind farm power per unit area

In the government’s study [[<span class="websitetitle">www.world-nuclear.org/policy/DTI-PIU.pdf</span>](http://www.world-nuclear.org/policy/DTI-PIU.pdf)] the UK onshore wind resource is estimated using an assumed wind farm power per unit area of at most 9 W/m<sup>2</sup> (capacity, not average production). If the capacity factor is 33% then the average power production would be 3 W/m<sup>2</sup>.

The London Array is an offshore wind farm planned for the outer Thames Estuary. With its 1 GW capacity, it is expected to become the world’s largest offshore wind farm. The completed wind farm will consist of 271 wind turbines in 245 km<sup>2</sup> [[<span class="websitetitle">6o86ec</span>](http://tinyurl.com/6o86ec)] and will deliver an average power of 3100 GWh per year (350 MW). (Cost £1.5 bn.) That’s a power per unit area of 350 MW/245 km<sup>2</sup> = 1.4 W/m<sup>2</sup>. This is lower than other offshore farms because, I guess, the site includes a big channel (Knock Deep) that’s too deep (about 20 m) for economical planting of turbines.

> *I’m more worried about what these plans [for the proposed London Array wind farm] will do to this landscape and our way of life than I ever was about a Nazi invasion on the beach.*
>
> Bill Boggia of Graveney, where the undersea cables of the wind farm will come ashore.

![](/img/without-hot-air/figure268.gif)

<span class="figurenumber">Figure B.9.</span> An Ampair "600 W" micro-turbine. The average power generated by this micro-turbine in Leamington Spa is 0.037 kWh per day (1.5 W).

![](/img/without-hot-air/figure269.gif)

<span class="figurenumber">Figure B.10.</span> A 5.5-m diameter Iskra 5 kW turbine [[<span class="websitetitle">www.iskrawind.com</span>](http://www.iskrawind.com/)] having its annual check-up. This turbine, located in Hertfordshire (not the windiest of locations in Britain), mounted at a height of 12 m, has an average output of 11 kWh per day. A wind farm of machines with this performance, one per 30 m × 30 m square, would have a power per unit area of <span class="green">0.5 W/m<sup>2</sup></span>.

## Queries

#### What about micro-generation? If you plop one of those miniturbines on your roof, what energy can you expect it to deliver?

Assuming a windspeed of 6 m/s, which, as I said before, is *above* the average for most parts of Britain; and assuming a diameter of 1 m, the power delivered would be 50 W. That’s 1.3 kWh per day – not very much. And in reality, in a typical urban location in England, a microturbine delivers just 0.2 kWh per day – see [chapter 10](../Text/chap10.xhtml#microturbines).

Perhaps the worst windmills in the world are a set in Tsukuba City, Japan, which actually consume more power than they generate. Their installers were so embarrassed by the stationary turbines that they imported power to make them spin so that they looked like they were working\! [[<span class="websitetitle">6bkvbn</span>](http://tinyurl.com/6bkvbn)]

## Notes and further reading

[^1]: *The maximum fraction of the incoming energy that can be extracted by a disc-like windmill...* There is a nice explanation of this on the Danish Wind Industry Association’s website. [[<span class="websitetitle">yekdaa</span>](http://tinyurl.com/yekdaa)].

[^2]: *Usually, wind turbines are designed to start running at wind speeds around 3 to 5 m/s*. [[<span class="websitetitle">ymfbsn</span>](http://tinyurl.com/ymfbsn)].

[^3]: *a typical load factor for a good site is 30%*. In 2005, the average load factor of all major UK wind farms was 28% [[<span class="websitetitle">ypvbvd</span>](http://tinyurl.com/ypvbvd)]. The load factor varied during the year, with a low of 17% in June and July. The load factor for the best region in the country – Caithness, Orkney and the Shetlands – was 33%. The load factors of the two offshore wind farms operating in 2005 were 36% for North Hoyle (off North Wales) and 29% for Scroby Sands (off Great Yarmouth). Average load factors in 2006 for ten regions were: Cornwall 25%; Mid-Wales 27%; Cambridgeshire and Norfolk 25%; Cumbria 25%; Durham 16%; Southern Scotland 28%; Orkney and Shetlands 35%; Northeast Scotland 26%; Northern Ireland 31%; offshore 29%. [[<span class="websitetitle">wbd8o</span>](http://tinyurl.com/wbd8o)]

Watson et al. (2002) say a minimum annual mean wind speed of 7.0 m/s is currently thought to be necessary for commercial viability of wind power. About 33% of UK land area has such speeds.
