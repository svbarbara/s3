import { Star, Quote, CheckCircle, TrendingUp } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export function TestimonialSection() {
  const { t, dir } = useTranslation();
  
  const testimonials = [{
    id: 1,
    name: t('testimonials.client1.name'),
    role: t('testimonials.client1.role'),
    company: t('testimonials.client1.company'),
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80",
    rating: 5,
    text: t('testimonials.client1.text'),
    highlight: t('testimonials.client1.highlight'),
    savings: t('testimonials.client1.savings')
  }, {
    id: 2,
    name: t('testimonials.client2.name'),
    role: t('testimonials.client2.role'),
    company: t('testimonials.client2.company'),
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80",
    rating: 5,
    text: t('testimonials.client2.text'),
    highlight: t('testimonials.client2.highlight'),
    savings: t('testimonials.client2.savings')
  }, {
    id: 3,
    name: t('testimonials.client3.name'),
    role: t('testimonials.client3.role'),
    company: t('testimonials.client3.company'),
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80",
    rating: 5,
    text: t('testimonials.client3.text'),
    highlight: t('testimonials.client3.highlight'),
    savings: t('testimonials.client3.savings')
  }];

  const stats = [{
    label: t('testimonials.stats.satisfaction'),
    value: "4.9/5",
    icon: Star
  }, {
    label: t('testimonials.stats.companies'),
    value: "500+",
    icon: CheckCircle
  }, {
    label: t('testimonials.stats.setup_time'),
    value: "48h",
    icon: TrendingUp
  }];

  return (
    <section id="testimonials" className="min-h-screen flex items-center py-16 bg-muted/30" dir={dir}>
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            {t('testimonials.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </div>

        {/* Stats Bar */}
        <div className="flex justify-center mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center animate-count-up" style={{
                  animationDelay: `${index * 0.2}s`
                }}>
                  <Icon className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.id} className="card-elevated p-6 animate-slide-up" style={{
              animationDelay: `${index * 0.2}s`
            }}>
              {/* Header */}
              <div className={`flex items-center space-x-4 mb-4 ${dir === 'rtl' ? 'space-x-reverse' : ''}`}>
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full object-cover bg-gray-200 dark:bg-gray-700" 
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = document.createElement('div');
                    fallback.className = 'w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold';
                    fallback.textContent = testimonial.name.charAt(0);
                    target.parentNode?.replaceChild(fallback, target);
                  }}
                />
                <div>
                  <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.company}</p>
                </div>
              </div>

              {/* Rating */}
              <div className={`flex items-center space-x-1 mb-4 ${dir === 'rtl' ? 'space-x-reverse' : ''}`}>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Quote */}
              <div className="relative mb-4">
                <Quote className={`w-6 h-6 text-primary/30 absolute -top-2 ${dir === 'rtl' ? '-right-2' : '-left-2'}`} />
                <p className={`text-foreground leading-relaxed ${dir === 'rtl' ? 'pr-4' : 'pl-4'}`}>
                  {testimonial.text}
                </p>
              </div>

              {/* Highlights */}
              <div className="space-y-2">
                <div className={`inline-flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm ${dir === 'rtl' ? 'space-x-reverse' : ''}`}>
                  <CheckCircle className="w-3 h-3" />
                  <span>{testimonial.highlight}</span>
                </div>
                <div className={`inline-flex items-center space-x-2 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-sm ${dir === 'rtl' ? 'space-x-reverse' : ''}`}>
                  <TrendingUp className="w-3 h-3" />
                  <span>{testimonial.savings}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Video Testimonial CTA */}
        <div className="mt-16 text-center animate-fade-in">
          
        </div>
      </div>
    </section>
  );
}