import { useState } from 'react'

export default function moveTO() {
  const [scrollTo, setScrollTo] = useState('');

  useEffect(() => {
    if (scrollTo) {
      const targetElement = document.getElementById(scrollTo);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
      setScrollTo('');
    }
  }, [scrollTo]);
}
