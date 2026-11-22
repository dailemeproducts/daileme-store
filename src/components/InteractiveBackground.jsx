import { useEffect, useRef } from "react";

export default function InteractiveBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animationFrameId;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    // تتبع موقع وسرعة الماوس الحقيقية (Velocity & Inertia)
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      vx: 0,
      vy: 0,
      active: false,
    };

    // 1. إعداد الخيوط الحريرية الطبوغرافية (Silk Topographic Strings)
    const WAVE_COUNT = 6;
    const NODE_COUNT = 45;
    let waves = [];

    // 2. إعداد ذرات الضوء الطافية (Sunbeam Dust Motes)
    const MOTE_COUNT = 18;
    let motes = [];

    // 3. شرارات الأثر اللحظية عند حركة الماوس السريعة
    let sparks = [];

    const initScene = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      // بناء الخيوط الحريرية
      waves = Array.from({ length: WAVE_COUNT }, (_, wIndex) => {
        const baseY = height * (0.18 + (wIndex / (WAVE_COUNT - 1)) * 0.68);
        const isGold = wIndex % 2 === 1;
        return {
          baseY,
          isGold,
          phase: wIndex * 1.1,
          speed: 0.0007 + wIndex * 0.00015,
          amplitude: 18 + (wIndex % 3) * 10,
          nodes: Array.from({ length: NODE_COUNT }, (__, nIndex) => ({
            x: (nIndex / (NODE_COUNT - 1)) * width,
            y: baseY,
            vy: 0,
            offsetY: 0,
          })),
        };
      });

      // بناء ذرات الضوء بأعماق مختلفة (Bokeh Depth)
      motes = Array.from({ length: MOTE_COUNT }, () => {
        const depth = 0.3 + Math.random() * 0.7; // 1 = قريب، 0.3 = بعيد
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.25,
          vy: -0.15 - Math.random() * 0.35, // صعود هادي للأعلى
          radius: (1.2 + Math.random() * 2.5) * depth,
          depth,
          alpha: (0.12 + Math.random() * 0.25) * depth,
          isGold: Math.random() > 0.45,
          phase: Math.random() * Math.PI * 2,
        };
      });
    };

    initScene();

    const updatePointer = (x, y) => {
      const dx = x - mouse.targetX;
      const dy = y - mouse.targetY;
      mouse.vx = Math.max(-35, Math.min(35, dx));
      mouse.vy = Math.max(-35, Math.min(35, dy));
      mouse.targetX = x;
      mouse.targetY = y;
      mouse.active = true;

      // توليد ذرات أثر دقيقة عند الحركة الملحوظة
      const speed = Math.hypot(mouse.vx, mouse.vy);
      if (speed > 6 && sparks.length < 30 && Math.random() > 0.35) {
        sparks.push({
          x: x + (Math.random() - 0.5) * 16,
          y: y + (Math.random() - 0.5) * 16,
          vx: mouse.vx * 0.08 + (Math.random() - 0.5) * 0.8,
          vy: mouse.vy * 0.08 - 0.4 - Math.random() * 0.5,
          size: 1 + Math.random() * 1.8,
          life: 1,
          decay: 0.015 + Math.random() * 0.015,
          isGold: Math.random() > 0.4,
        });
      }
    };

    const handleMouseMove = (e) => updatePointer(e.clientX, e.clientY);
    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        updatePointer(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener("resize", initScene);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    const render = (time) => {
      ctx.clearRect(0, 0, width, height);

      // تنعيم حركة الماوس وتلاشي السرعة تدريجياً
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;
      mouse.vx *= 0.88;
      mouse.vy *= 0.88;

      // ==========================================
      // الطبقة 1: إضاءة الغلاف المحيطية (Ambient Parallax Sun & Mountain Glow)
      // ==========================================
      const parallaxX = (mouse.x - width / 2) * 0.12;
      const parallaxY = (mouse.y - height / 2) * 0.12;

      // هالة الشمس الذهبية الدافية
      const sunX = width * 0.75 - parallaxX;
      const sunY = height * 0.28 - parallaxY;
      const sunGrad = ctx.createRadialGradient(
        sunX,
        sunY,
        0,
        sunX,
        sunY,
        Math.max(width, height) * 0.48,
      );
      sunGrad.addColorStop(0, "rgba(244, 148, 116, 0.11)");
      sunGrad.addColorStop(0.5, "rgba(244, 180, 116, 0.04)");
      sunGrad.addColorStop(1, "rgba(250, 246, 240, 0)");
      ctx.fillStyle = sunGrad;
      ctx.fillRect(0, 0, width, height);

      // هالة الجبل البنفسجية الهادية
      const mtnX = width * 0.25 + parallaxX * 0.8;
      const mtnY = height * 0.72 + parallaxY * 0.8;
      const mtnGrad = ctx.createRadialGradient(
        mtnX,
        mtnY,
        0,
        mtnX,
        mtnY,
        Math.max(width, height) * 0.5,
      );
      mtnGrad.addColorStop(0, "rgba(76, 59, 120, 0.07)");
      mtnGrad.addColorStop(0.6, "rgba(136, 121, 179, 0.025)");
      mtnGrad.addColorStop(1, "rgba(250, 246, 240, 0)");
      ctx.fillStyle = mtnGrad;
      ctx.fillRect(0, 0, width, height);

      // هالة خفيفة جداً تتبع الماوس مباشرة كإضاءة مكتب
      if (mouse.active) {
        const cursorGlow = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          220,
        );
        cursorGlow.addColorStop(0, "rgba(244, 148, 116, 0.09)");
        cursorGlow.addColorStop(0.5, "rgba(76, 59, 120, 0.03)");
        cursorGlow.addColorStop(1, "rgba(250, 246, 240, 0)");
        ctx.fillStyle = cursorGlow;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 220, 0, Math.PI * 2);
        ctx.fill();
      }

      // ==========================================
      // الطبقة 2: خيوط الأثر الحريرية (Interactive Silk Topographic Waves)
      // ==========================================
      waves.forEach((wave, wIdx) => {
        const nodes = wave.nodes;

        // تحديث فيزياء كل نقطة على الخيط
        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];
          const nx = i / (nodes.length - 1);

          // حركة الموجة الطبيعية الهادية
          const naturalWave =
            Math.sin(nx * 4.5 + time * wave.speed + wave.phase) *
              wave.amplitude +
            Math.cos(nx * 2.2 - time * wave.speed * 0.7) *
              (wave.amplitude * 0.5);

          // تفاعل الخيط مع مرور الماوس (شد الوتر)
          if (mouse.active) {
            const dx = mouse.x - node.x;
            const dy = mouse.y - (wave.baseY + naturalWave + node.offsetY);
            const dist = Math.hypot(dx, dy);
            const maxDist = 150;

            if (dist < maxDist) {
              const influence = Math.pow(1 - dist / maxDist, 2);
              // الخيط يتأثر بسرعة واتجاه الماوس
              node.vy += (mouse.vy * 0.28 + (dy > 0 ? -1.2 : 1.2)) * influence;
            }
          }

          // فيزياء السوستة (Spring Tension) مع النقاط المجاورة عشان الموجة تسرح في الخيط
          if (i > 0 && i < nodes.length - 1) {
            const neighborAvg =
              (nodes[i - 1].offsetY + nodes[i + 1].offsetY) * 0.5;
            node.vy += (neighborAvg - node.offsetY) * 0.18;
          }

          // رجوع تدريجي للأصل مع تخميد ناعم
          node.vy += -node.offsetY * 0.04;
          node.vy *= 0.91;
          node.offsetY += node.vy;

          node.y = wave.baseY + naturalWave + node.offsetY;
        }

        // رسم الخيط الحريري بمنحنيات متصلة
        ctx.beginPath();
        ctx.moveTo(nodes[0].x, nodes[0].y);

        for (let i = 0; i < nodes.length - 1; i++) {
          const xc = (nodes[i].x + nodes[i + 1].x) * 0.5;
          const yc = (nodes[i].y + nodes[i + 1].y) * 0.5;
          ctx.quadraticCurveTo(nodes[i].x, nodes[i].y, xc, yc);
        }

        const last = nodes[nodes.length - 1];
        ctx.lineTo(last.x, last.y);

        // تدرج لوني يخلي الخيط يختفي بنعومة عند حواف الشاشة وينور جنب الماوس
        const lineGrad = ctx.createLinearGradient(0, 0, width, 0);
        const baseColor = wave.isGold ? "244, 148, 116" : "76, 59, 120";
        const baseAlpha = wave.isGold ? 0.16 : 0.1;

        lineGrad.addColorStop(0, `rgba(${baseColor}, 0)`);
        lineGrad.addColorStop(0.15, `rgba(${baseColor}, ${baseAlpha})`);
        lineGrad.addColorStop(0.5, `rgba(${baseColor}, ${baseAlpha * 0.6})`);
        lineGrad.addColorStop(0.85, `rgba(${baseColor}, ${baseAlpha})`);
        lineGrad.addColorStop(1, `rgba(${baseColor}, 0)`);

        ctx.strokeStyle = lineGrad;
        ctx.lineWidth = wIdx % 2 === 0 ? 1.2 : 0.8;
        ctx.stroke();
      });

      // ==========================================
      // الطبقة 3: ذرات الضوء في تيار الهوا (Kinetic Sunbeam Motes)
      // ==========================================
      motes.forEach((mote) => {
        mote.phase += 0.02;

        // تفاعل الذرات مع تيار هواء الماوس (Wind Wake & Swirl)
        if (mouse.active) {
          const dx = mote.x - mouse.x;
          const dy = mote.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          const wakeRadius = 180 * mote.depth;

          if (dist < wakeRadius && dist > 1) {
            const force = Math.pow(1 - dist / wakeRadius, 1.5);
            // نقل جزء من سرعة الماوس للذرة + دوران دوامي خفيف
            mote.vx +=
              (mouse.vx * 0.045 * mote.depth + (dx / dist) * 0.18) * force;
            mote.vy +=
              (mouse.vy * 0.045 * mote.depth + (dy / dist) * 0.18) * force;
          }
        }

        // حركة طبيعية هادية مع مقاومة الهوا
        mote.vx *= 0.96;
        mote.vy = mote.vy * 0.96 - 0.008 * mote.depth;

        mote.x += mote.vx + Math.sin(mote.phase) * 0.25 * mote.depth;
        mote.y += mote.vy;

        // التفاف الذرات حول حدود الشاشة
        if (mote.y < -20) mote.y = height + 20;
        if (mote.y > height + 20) mote.y = -20;
        if (mote.x < -20) mote.x = width + 20;
        if (mote.x > width + 20) mote.x = -20;

        // نبض إضاءة خفيف
        const pulse = 0.75 + Math.sin(mote.phase * 1.5) * 0.25;
        const currentAlpha = mote.alpha * pulse;
        const color = mote.isGold ? "244, 148, 116" : "76, 59, 120";

        ctx.beginPath();
        ctx.arc(mote.x, mote.y, mote.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${currentAlpha})`;
        ctx.fill();
      });

      // ==========================================
      // الطبقة 4: شرارات الأثر الدقيقة (Ephemeral Wake Sparks)
      // ==========================================
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vx *= 0.95;
        s.vy *= 0.95;
        s.life -= s.decay;

        if (s.life <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        const color = s.isGold ? "244, 148, 116" : "76, 59, 120";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * s.life, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${s.life * 0.38})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", initScene);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
