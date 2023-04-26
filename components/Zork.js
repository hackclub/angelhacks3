import styles from './Zork.module.scss'
import { Azeret_Mono } from 'next/font/google'
import { useRef, useEffect } from 'react'
import { Button } from './PhotoGallery'

const FAQ = `Here's a list of commonly asked questions:
Can I join?
-----------
If you're in middle school, high school, or an alumni of Hack Club, yes, we are so excited to see you in SF! If you're not sure, shoot us a mail at assemble@hackclub.com.
What do I need?
---------------
Your laptop, chargers, anything for your hack (hardware?), toiletries, sleeping bags, and an open mind.
How much does it cost?
----------------------
Nothing! We’ll have meals, snacks, and beverages onsite at the hackathon, as well as swag, prizes, and fun mini-events.
Who is judging?
---------------
Judging is done by the people that matter the most– attendees. If you ship a project you can vote on other projects. That said, we'll still have pretty cool people hang out with us.
I'm not that good at coding...
------------------------------
This hackathon is for hackers of all skill levels! We'll have workshops and other events so join us and let's learn together. If you'd like to start exploring some introductory projects, check out Hack Club Workshops.
What can I make?
----------------
Anything! Apps, art, sites, and hardware projects are all perfect for a hackathon. Check out what Hack Clubbers are making every day!
What are the sleeping arrangements?
-----------------------------------
From 9PM - 7AM on both nights we will have a designated sleeping area in the Figma office with low lights and minimal sound for you to rest! Make sure to bring a sleeping bag!
My parents are worried!
-----------------------
We're here to help, ask them to reach out to us at assemble@hackclub.com and we'll make sure to answer all their questions. Assemble will be supervised by background checked staff and overseen by 24/7 security staff`

const azeretMono = Azeret_Mono({
  weight: ['400'],
  subsets: ['latin']
})

export default function Zork() {
  // ! This is pretty forkin' dumb! I'd probably use a tree or something IRL, but this is just a demo.
  const mailbox = useRef(true)
  const indoors = useRef(false)
  const leafletTaken = useRef(false)
  const bookshelf = useRef(false)
  const opentv = useRef(false)
  const outputRef = useRef(null)

  const respond = input => {
    input = input.trim().toLowerCase()
    switch (input) {
      case 'help':
        if (mailbox.current)
          typewrite('\nHave you tried opening the mailbox yet?')
        else if (!indoors.current)
          typewrite('\nHave you tried going inside yet?')
        else typewrite('\nHave you checked out the bookshelf yet?')
        break
      case 'open mailbox':
        typewrite('\nOpening the small mailbox reveals a leaflet.')
        break
      case 'read leaflet':
        if (!leafletTaken.current && indoors.current)
          typewrite('\nWhat leaflet are you talking about?')
        else {
          if (!leafletTaken.current) {
            leafletTaken.current = true
            typewrite(
              '\n(Taken) \n"All the answers to your questions can be found on the bookshelf inside."'
            )
          } else
            typewrite(
              '\n"All the answers to your questions can be found on the bookshelf inside."'
            )
        }
        break
      case 'drop leaflet':
        if (leafletTaken.current) {
          leafletTaken.current = false
          typewrite('\nDropped.')
        } else typewrite('\nWhat leaflet are you talking about?')
        break
      case 'about':
      case 'what':
        typewrite(
          `\nNothin' much! This is a geeky reference to Zork (with a smaller scope, of course!), have you heard of it before? Try \`open zork\`.`
        )
        break
      case 'open zork':
        window.open('https://en.wikipedia.org/wiki/Zork', '_blank')
        typewrite('')
        break
      case 'go inside':
      case 'enter house':
        mailbox.current = false
        indoors.current = true
        typewrite(
          '\nLiving Room\nYou are in the living room. A bookshelf appears to take up the entire room, dwarfing a TV in the corner.'
        )
        break
      case 'go to bookshelf':
      case 'check out bookshelf':
      case 'bookshelf':
        if (indoors.current && !bookshelf.current) {
          bookshelf.current = true
          typewrite(
            '\nYou head over to the bookshelf. The books are covered with dust, but one sticks out to you. There is no dust on it, and it\'s titled: "AngelHacks FAQ"'
          )
        } else if (indoors.current && bookshelf.current)
          typewrite("\nYou're already at the bookshelf.")
        else typewrite('\nWhat bookshelf are you talking about?')
        break
      case 'read book':
      case 'read the book':
      case 'read angelhacks faq':
      case 'read "angelhacks faq"':
      case "read 'angelhacks faq'":
        if (bookshelf.current)
          typewrite(
            `\nYou pull down the book. You flip to the front page: \n${FAQ}\nYou put the book back on the shelf, as it is quite heavy.`
          )
        else typewrite('\nWhat are you talking about?')
        break
      case 'open tv':
        if (indoors.current && !opentv.current) {
          opentv.current = true
          bookshelf.current = false
          typewrite(
            '\nYou head over to the TV and open it. It looks like someone\'s been playing a game. You can vaguely make out the phrase "I ❤️ HC".'
          )
        } else if (indoors.current && opentv.current)
          typewrite(
            '\nThe TV is already open. It looks like someone\'s been playing a game. You can vaguely make out the phrase "I ❤️ HC".'
          )
        else typewrite('\nWhat TV are you talking about?')
        break
      default:
        typewrite("\nI don't understand. Try `help`.")
        break
    }
  }

  const typewrite = (content, speed = 5) => {
    if (content.length) {
      outputRef.current.innerHTML =
        outputRef.current.innerHTML +
        (content[0] === '\n' ? '<br><br>' : content[0])
      if (content[0] === '\n')
        window.scrollTo(
          0,
          outputRef.current.offsetTop + outputRef.current.scrollHeight
        )
      setTimeout(() => typewrite(content.slice(1)), speed)
    } else {
      // Wait for user input
      outputRef.current.innerHTML = outputRef.current.innerHTML + '<br><br>'
      let form = document.createElement('div')
      form.addEventListener('keydown', event => {
        if (event.key === 'Enter') {
          form.contentEditable = false
          respond(event.target.innerText.toLowerCase())
        }
      })
      form.contentEditable = true
      outputRef.current.appendChild(form)
      form.focus()
    }
  }

  useEffect(() => {
    const form = document.createElement('div')
    form.contentEditable = true
    form.addEventListener('keydown', event => {
      if (event.key === 'Enter') {
        form.contentEditable = false
        respond(event.target.innerText.toLowerCase())
      }
    })
    outputRef.current.appendChild(form)
  }, [])

  return (
    <div className="prose">
      <p>
        You'll find the answers here... (
        <button
          className="link"
          onClick={() => {
            typewrite(`\nOkay, fine you sucka. (Just joking.)\n${FAQ}`, 1)
          }}>
          Can you just give me the FAQ?
        </button>
        )
      </p>
      <div className={`${styles.terminal} ${azeretMono.className}`}>
        <div ref={outputRef} style={{ display: 'inline' }}>
          West of House
          <br />
          <br />
          You are standing in the front yard of a white house.
          <br />
          <br />
          There is a small mailbox here.
          <br />
          <br />
        </div>
      </div>
    </div>
  )
}
