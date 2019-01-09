**v2**

# **HOW TO CREATE CONTENT FOR THIS THING**

# The three columns
There are three categories of unit in this game: 'gpa', 'money', and 'iq'. Each one has a *total value*, a *value acquired per update*, a *product button*, and a *product update* button. *Products* cause the column to gain its respective unit per update and are purchased for either money or iq (gpa is *never* spent in this game). *Product upgrades* upgrade *all* products of one column into another, and make the new upgraded product the only one available for purchase.

# Products
Products are purchased by the player in order to gain a steady stream of some unit per update. Each column may only have *one* type of product at a time, and upgrading to a new product makes that new product the only type of product available for that column.

The total list of product upgrades for each column is stored as a stack in product.js. Because it's a stack, list the products in **reverse order of acquisition**. In order to create new products, simply initialize them in product.js under the appropriate section and then add it to the column's stack.

Note that the player will not get to see the next product in line for upgrading until they have enough money to actually purchase it. This adds an element of surprise for the player as they don't know what they'll be getting next. If you want to quickly test a product's button text, give it a very low cost so you can quickly see it.

**Each product stack must have a minimum of 2 items in it**

Products have the following arguments:

* cost - how much to be spent to acquire it (every time a product is bought, its cost increases by ceilinged 10%)

* upgradeCost - how much needs to be spent to upgrade to the next product on the stack

* unit - which unit is spent to acquire it/upgrade to it (either money or iq, *never* gpa)

* increment - how much the product increases the columns update stream by

* name - the text that represents this product in the middle of buttons. Always lowercase.

* formalname - the text that represents this product in each column's update stream section. Always capitalized.

* flavor - flavor text that describes the product, displayed inside buttons

# ClickProducts
Like products, but exclusively for the gpa column, which is the only column with a "clicker" button. These products upgrade the clicker button to produce more gpa per click. ClickProducts function akin to normal Products that only have the "upgrade" option (since clicking is essentially this product's "purchasing"). Like normal products, these are stored by the gpa column in a stack.

**The clickproduct stack must have a minimum of 2 items in it**

ClickProducts have the following arguments:

* cost - how much to be spent to upgrade the click button to this

* unit - what's spent to acquire this, either money or iq

* increment - how much gpa the clicker generates once this clickproduct is acquired

* name - text to represent this product in the upgrade button. Always lowercase.

* buttontext - the text that the clicker button will have once this product is acquired

* flavor - text to describe this product in the upgrade button

# Quests
While the gpa column has the clicker button, the money and iq columns have exclusive access to "quests." "Quests" are the driving force of the game. Once a column's quest's prerequisites are met, that column immediately gains some amount of money/iq and a message appears in the player's message box. These messages can be used to build up a story. Furthermore, the money and iq columns, once both of their first quests are complete, will display a "current quest" message that shows how much gpa/money/iq (unlike products, gpa can be used for quests) is needed for the next quest to be complete. 

A quest's prerequisites are always having x amount of gpa or money or iq. No gpa, money, or iq is never "spent"/lost on a quest: the game checks that you have that much, and then you get a reward. Note that the quest's prerequisite unit and the quest's reward unit are *independent*. You can have a quest that, once the player has an IQ of 120, they gain $50. Such a quest would be placed in the money quest stack, since the reward is in $ (similarly, a quest whose reward is IQ points is placed in the IQ quest stack, regardless of its prerequisite unit).

**Each quest stack must have a minimum of 1 item in it**

Quests have the following arguments:

* cost - how much of a unit the player must have for the quest to be complete

* unit - the unit of the cost, gpa or money or iq 

* gain - how much the column gains from the quest

* message - the text message the player receives when the quest is complete

# Adding content
This has been set up so that *no one has to look at anything other than products.js, quests.js, and messages.js to create content*. **Don't muck about in anything else unless you think you've found a bug.** To add a product or clickproduct, go to products.js, initialize some new products, and add them to the desired stack. To create a new quest, go to quests.js and do likewise. Store messages in messages.js.