# Upright Labs Frontend Test

You'll need to develop a web UI that is capable of recording the mouse of a user. The app needs to record the mouse positions, persist it to a local database, then be able to replay the mouse positions on the screen.

Here's a video demo https://www.useloom.com/share/bf207dc338c146899b4c0d40b1dec1e5.

### Requirements

- Git
- Ruby 2+
- 3-4 Hours Time

### Steps

- Clone this repository
- In the "Client" directory, create a web UI to record mouse position, fulfills spec below. You can use any frontend libraries or modules.
- Zip up all supporting files
- Add instructions on how to run the client
- Send to jackson@uprightlabs.com

### Model

Recording

- name: string, must be present
- body: text, must be present, this is where you can put recording data

### Spec

- Should have a UI where a user can record their mouse, play back recordings, view all previous recordings, delete previous recordings
- Recordings should be at 60fps
- Every recording should have a name
- Once a recording has been taken, it should persist to a database. I should be able to go view all previous recordings and play any of them.

### How we grade this test

- Does it work as expected?
- Does it have a functional UI? Does the UI look good?
- Is this performant? Does this work at 60fps?
- Do they use best practices in their code? Up to date dependencies/ dev tools?
- Does it actually save recordings to a db?
- Is code readable? Well documented? Are design decisions documented?
- Does the UI have a nice design?
- Are there instructions for how to run the app?
- Are there tests?

### Whats Next?

After we receive your app, we grade it according to the criteria above. If all looks good, we'll invite you into our office where we'll whiteboard and go over technical problems and solutions.

### Runnning the server

- requires ruby 2.0+
- `cd` into the "api" directory
- install the bundler gem with `gem install bundler`
- install dependencies with `bundle install`
- migrate the DB (sqlite) with `rails db:migrate`
- run the server with `rails server`

### Questions

Hit me up at jackson@uprightlabs.com

### Issues

Find a typo or bug? Submit a pr!
