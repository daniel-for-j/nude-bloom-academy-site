
import { Link } from 'react-router-dom';
import { Mail, Instagram, Twitter, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-nude-100 text-primary py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and tagline */}
          <div>
            <Link to="/" className="text-3xl font-serif font-medium">SOAR</Link>
            <p className="mt-4 text-primary/70">Empowering individuals to reach their highest potential through education, community, and support.</p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-serif font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:underline text-primary/80 hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/join" className="hover:underline text-primary/80 hover:text-primary transition-colors">Join Us</Link></li>
              <li><Link to="/blog" className="hover:underline text-primary/80 hover:text-primary transition-colors">Blog</Link></li>
              <li><Link to="/academy" className="hover:underline text-primary/80 hover:text-primary transition-colors">Academy</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-serif font-medium mb-4">Connect With Us</h4>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-primary/80 hover:text-primary transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-primary/80 hover:text-primary transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-primary/80 hover:text-primary transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="mailto:contact@soarcommunity.com" className="text-primary/80 hover:text-primary transition-colors">
                <Mail size={20} />
                <span className="sr-only">Email</span>
              </a>
            </div>
            <p className="text-primary/70">Contact: contact@soarcommunity.com</p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-nude-300 text-center text-primary/60">
          <p>&copy; {new Date().getFullYear()} SOAR Community. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
