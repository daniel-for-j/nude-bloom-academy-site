import PageHeader from "../components/PageHeader";

const About = () => {
  return (
    <div>
      <PageHeader
        title="About Us"
        subtitle="Learn about our mission, values, and the story behind SOAR Community"
      />

      <section className="py-16 md:py-24 bg-nude-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-medium mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-primary/80 mb-6">
                SOAR Community is a personal growth and empowerment platform
                dedicated to helping individuals build unshakable confidence and
                develop powerful communication skills that amplify their voice
                and purpose. Through relatable content, coaching, group
                workshops, and a vibrant online presence, we’re on a mission to
                see people rise up bold, self-aware, and ready to lead in their
                own space. Broken down into the SOAR Academy, Blog, Podcast, and
                the Community at large, we create resources and experiences that
                empower individuals to face fear, own their identity, and
                communicate with clarity.
              </p>
              <p className="text-lg text-primary/80">
                Our mission is to provide the knowledge, support, and practical
                strategies needed to overcome inner barriers. Whether you’re
                preparing for a major event, aiming to excel professionally, or
                simply want to show up with more confidence in everyday life —
                we’re here to walk that journey with you. At SOAR Community, we
                believe the future is yours to create. And your voice is the
                key.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-md">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                alt="Team collaboration"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-serif font-medium mb-12 text-center">
            Our Values
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 border border-nude-200 rounded-lg">
              <h3 className="text-2xl font-serif font-medium mb-4">Growth</h3>
              <p className="text-primary/80">
                We believe in continuous learning and development. Every
                experience is an opportunity to grow and evolve.
              </p>
            </div>

            <div className="p-6 border border-nude-200 rounded-lg">
              <h3 className="text-2xl font-serif font-medium mb-4">
                Community
              </h3>
              <p className="text-primary/80">
                We foster a supportive network where members can connect,
                collaborate, and inspire one another.
              </p>
            </div>

            <div className="p-6 border border-nude-200 rounded-lg">
              <h3 className="text-2xl font-serif font-medium mb-4">
                Excellence
              </h3>
              <p className="text-primary/80">
                We strive for excellence in everything we do, from the content
                we create to the experiences we provide.
              </p>
            </div>

            <div className="p-6 border border-nude-200 rounded-lg">
              <h3 className="text-2xl font-serif font-medium mb-4">
                Authenticity
              </h3>
              <p className="text-primary/80">
                We value genuine connections and encourage members to embrace
                their unique qualities and perspectives.
              </p>
            </div>

            <div className="p-6 border border-nude-200 rounded-lg">
              <h3 className="text-2xl font-serif font-medium mb-4">
                Empowerment
              </h3>
              <p className="text-primary/80">
                We empower individuals to take charge of their journey and
                pursue their goals with confidence.
              </p>
            </div>

            <div className="p-6 border border-nude-200 rounded-lg">
              <h3 className="text-2xl font-serif font-medium mb-4">
                Innovation
              </h3>
              <p className="text-primary/80">
                We embrace creativity and innovation, constantly seeking new
                ways to enhance our offerings and better serve our community.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
