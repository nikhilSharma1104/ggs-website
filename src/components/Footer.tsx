import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-primary-600 text-white py-16">
      <div className="container mx-auto grid md:grid-cols-3 gap-12 px-4">
        {/* Contact Information */}
        <div>
          <h3 className="text-2xl font-comic font-bold text-secondary-300 mb-6">Contact Us</h3>
          <div className="space-y-4 font-comic">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">📍</span>
              <div>
                <p className="font-bold text-secondary-200">Address</p>
                <p className="text-gray-300">123 School Street, City Name</p>
                <p className="text-gray-300">State 12345</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-2xl">📞</span>
              <div>
                <p className="font-bold text-secondary-200">Phone</p>
                <p className="text-gray-300">+1 (123) 456-7890</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-2xl">📧</span>
              <div>
                <p className="font-bold text-secondary-200">Email</p>
                <p className="text-gray-300">hello@gurukulamschool.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* School Hours */}
        <div>
          <h3 className="text-2xl font-comic font-bold text-secondary-300 mb-6">School Hours</h3>
          <div className="space-y-2 font-comic text-gray-300">
            <p>Monday - Friday: 8:00 AM - 3:30 PM</p>
            <p>Saturday: 8:00 AM - 12:30 PM</p>
            <p>Sunday: Closed</p>
          </div>
        </div>

        {/* Google Maps */}
        <div>
          <h3 className="text-2xl font-comic font-bold text-secondary-300 mb-6">Find Us Here</h3>
          <div className="rounded-xl overflow-hidden h-48">
            <iframe
              src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDYcwO8ojKK6aIMzA6Tb6-GwYjzHckHJOU&q=Gurukulam+Global+School,Mathura+UP"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-xl"
            ></iframe>
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-12 pt-8 border-t border-gray-700 text-center font-comic text-gray-300">
        <p>© {new Date().getFullYear()} Gurukulam Global School. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
