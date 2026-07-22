import bananaFrenchToastSrc from './assets/food-images/banana-french-toast.jpg?w=640&format=webp'
import bananaFrenchToastSrcSet from './assets/food-images/banana-french-toast.jpg?w=320;640&format=webp&as=srcset'
import burgerSrc from './assets/food-images/burger.jpg?w=640&format=webp'
import burgerSrcSet from './assets/food-images/burger.jpg?w=320;640&format=webp&as=srcset'
import cajunPastaSrc from './assets/food-images/cajun-pasta.jpg?w=640&format=webp'
import cajunPastaSrcSet from './assets/food-images/cajun-pasta.jpg?w=320;640&format=webp&as=srcset'
import charcuterieSrc from './assets/food-images/charcuterie.jpg?w=640&format=webp'
import charcuterieSrcSet from './assets/food-images/charcuterie.jpg?w=320;640&format=webp&as=srcset'
import cheesecakeSrc from './assets/food-images/cheesecake.jpg?w=640&format=webp'
import cheesecakeSrcSet from './assets/food-images/cheesecake.jpg?w=320;640&format=webp&as=srcset'
import chickenSlammerSrc from './assets/food-images/chicken-slammer.jpg?w=640&format=webp'
import chickenSlammerSrcSet from './assets/food-images/chicken-slammer.jpg?w=320;640&format=webp&as=srcset'
import deathByChocolateSrc from './assets/food-images/death-by-chocolate.jpg?w=640&format=webp'
import deathByChocolateSrcSet from './assets/food-images/death-by-chocolate.jpg?w=320;640&format=webp&as=srcset'
import donutsSrc from './assets/food-images/donuts.jpg?w=640&format=webp'
import donutsSrcSet from './assets/food-images/donuts.jpg?w=320;640&format=webp&as=srcset'
import italianMeatballsSrc from './assets/food-images/italian-meatballs.jpg?w=640&format=webp'
import italianMeatballsSrcSet from './assets/food-images/italian-meatballs.jpg?w=320;640&format=webp&as=srcset'
import lambChopSrc from './assets/food-images/lamb-chop.jpg?w=640&format=webp'
import lambChopSrcSet from './assets/food-images/lamb-chop.jpg?w=320;640&format=webp&as=srcset'
import mangoLassiSrc from './assets/food-images/mango-lassi.jpg?w=640&format=webp'
import mangoLassiSrcSet from './assets/food-images/mango-lassi.jpg?w=320;640&format=webp&as=srcset'
import mojitoSrc from './assets/food-images/mojito.jpg?w=640&format=webp'
import mojitoSrcSet from './assets/food-images/mojito.jpg?w=320;640&format=webp&as=srcset'
import oldFashionedSrc from './assets/food-images/old-fashioned.jpg?w=640&format=webp'
import oldFashionedSrcSet from './assets/food-images/old-fashioned.jpg?w=320;640&format=webp&as=srcset'
import pestoBowtiePastaSrc from './assets/food-images/pesto-bowtie-pasta.jpg?w=640&format=webp'
import pestoBowtiePastaSrcSet from './assets/food-images/pesto-bowtie-pasta.jpg?w=320;640&format=webp&as=srcset'
import pizzaSrc from './assets/food-images/pizza.jpg?w=640&format=webp'
import pizzaSrcSet from './assets/food-images/pizza.jpg?w=320;640&format=webp&as=srcset'
import porkChopSrc from './assets/food-images/pork-chop.jpg?w=640&format=webp'
import porkChopSrcSet from './assets/food-images/pork-chop.jpg?w=320;640&format=webp&as=srcset'
import ramenSrc from './assets/food-images/ramen.jpg?w=640&format=webp'
import ramenSrcSet from './assets/food-images/ramen.jpg?w=320;640&format=webp&as=srcset'
import salmonSrc from './assets/food-images/salmon.jpg?w=640&format=webp'
import salmonSrcSet from './assets/food-images/salmon.jpg?w=320;640&format=webp&as=srcset'
import salmonSaladSrc from './assets/food-images/salmon-salad.jpg?w=640&format=webp'
import salmonSaladSrcSet from './assets/food-images/salmon-salad.jpg?w=320;640&format=webp&as=srcset'
import streetTacosSrc from './assets/food-images/street-tacos.jpg?w=640&format=webp'
import streetTacosSrcSet from './assets/food-images/street-tacos.jpg?w=320;640&format=webp&as=srcset'
import veggieSammySrc from './assets/food-images/veggie-sammy.jpg?w=640&format=webp'
import veggieSammySrcSet from './assets/food-images/veggie-sammy.jpg?w=320;640&format=webp&as=srcset'

export type FoodImage = {
  src: string
  srcSet: string
}

export const foodImages: Record<string, FoodImage> = {
  'banana-french-toast.jpg': { src: bananaFrenchToastSrc, srcSet: bananaFrenchToastSrcSet },
  'burger.jpg': { src: burgerSrc, srcSet: burgerSrcSet },
  'cajun-pasta.jpg': { src: cajunPastaSrc, srcSet: cajunPastaSrcSet },
  'charcuterie.jpg': { src: charcuterieSrc, srcSet: charcuterieSrcSet },
  'cheesecake.jpg': { src: cheesecakeSrc, srcSet: cheesecakeSrcSet },
  'chicken-slammer.jpg': { src: chickenSlammerSrc, srcSet: chickenSlammerSrcSet },
  'death-by-chocolate.jpg': { src: deathByChocolateSrc, srcSet: deathByChocolateSrcSet },
  'donuts.jpg': { src: donutsSrc, srcSet: donutsSrcSet },
  'italian-meatballs.jpg': { src: italianMeatballsSrc, srcSet: italianMeatballsSrcSet },
  'lamb-chop.jpg': { src: lambChopSrc, srcSet: lambChopSrcSet },
  'mango-lassi.jpg': { src: mangoLassiSrc, srcSet: mangoLassiSrcSet },
  'mojito.jpg': { src: mojitoSrc, srcSet: mojitoSrcSet },
  'old-fashioned.jpg': { src: oldFashionedSrc, srcSet: oldFashionedSrcSet },
  'pesto-bowtie-pasta.jpg': { src: pestoBowtiePastaSrc, srcSet: pestoBowtiePastaSrcSet },
  'pizza.jpg': { src: pizzaSrc, srcSet: pizzaSrcSet },
  'pork-chop.jpg': { src: porkChopSrc, srcSet: porkChopSrcSet },
  'ramen.jpg': { src: ramenSrc, srcSet: ramenSrcSet },
  'salmon.jpg': { src: salmonSrc, srcSet: salmonSrcSet },
  'salmon-salad.jpg': { src: salmonSaladSrc, srcSet: salmonSaladSrcSet },
  'street-tacos.jpg': { src: streetTacosSrc, srcSet: streetTacosSrcSet },
  'veggie-sammy.jpg': { src: veggieSammySrc, srcSet: veggieSammySrcSet },
}
