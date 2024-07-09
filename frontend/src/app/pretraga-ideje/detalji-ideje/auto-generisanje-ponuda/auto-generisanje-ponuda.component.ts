import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IdejaServis } from 'src/app/ideja-servis.service';
import { Ideja } from 'src/app/models/Ideja';
import { Ponuda } from 'src/app/models/Ponuda';
import { Produkt } from 'src/app/models/Produkt';

@Component({
  selector: 'app-auto-generisanje-ponuda',
  templateUrl: './auto-generisanje-ponuda.component.html',
  styleUrls: ['./auto-generisanje-ponuda.component.css']
})
export class AutoGenerisanjePonudaComponent {

  ideja: Ideja | undefined;
  imgSrc: string | undefined;
  ponude: Ponuda[] = [];
  produkti: Produkt[] = [];
  svgElement: any;
  izabraniProdukt!: Produkt;
  tagovi : {naziv:string}[]=[]

  minimalnaCenaPonude: number = 0;
  maksimalnaCenaPonude: number = 0;
  maksimalnaCenaPonudePlafon: number = 0;

  trenutnaDonjaGranica :number =0;
  trenutnaGornjaGranica :number = 0;

  tipKorisnika: string = "";

  prikazPonude : boolean = false;

  @ViewChild('myCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private animationId!: number;
  private glowOpacity: number = 0.1;
  private growing: boolean = true;

  materials: string[] = ['Drvo', 'Metal', 'Staklo', 'Plastika'];
  selectedMaterial: string = this.materials[0];

  value: number[] = [20, 80];
  sliderOptions: any = {
    floor: 0,
    ceil: 100
  };

  minValue: number = 20;
  maxValue: number = 80;
  minRange: number = 0;
  maxRange: number = 100;
  elementId: string = "";

  selectedColor: string = '#ff0000';

  xIscrtan: number = 0;
  yIscrtan: number = 0;

  constructor(
    private route: ActivatedRoute,
    private idejaService: IdejaServis // Ovo je servis za dohvat podataka
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.elementId = params.get('id')!;
      this.tipKorisnika = JSON.parse(sessionStorage.getItem("user")!)["type"];

      this.idejaService.dohvatiIdejuPoId(parseInt(this.elementId!)).subscribe((ideja) => {
        this.ideja = ideja;
        //alert(ideja.autor)
        this.convertBase64ToImage(ideja.slika!);
        ideja.produkti.forEach((elem) => {
          this.produkti.push(elem);
        })
        ideja.tagovi.forEach((elem) => {
          this.tagovi.push({naziv: String(elem.naziv)});
          //alert(elem)
        })

        this.ideja?.produkti.forEach(prod => {
          this.idejaService.dohvatiPonudeZaTag(prod.naziv).subscribe( resp =>{
            prod.ponude = resp;
          }
          );
        })
      })

    });

    const canvas = this.canvasRef.nativeElement;
    const image = this.canvasRef.nativeElement.previousElementSibling as HTMLImageElement;

    // Podešavanje dimenzija platna da odgovara slici
    canvas.width = image.width;
    //alert(image.height)
    canvas.height = image.height;


    this.ctx = this.canvasRef.nativeElement.getContext('2d')!;
    this.canvasRef.nativeElement.addEventListener('click', this.handleCanvasClick.bind(this));
    this.drawDot();
    this.startGlow();
  }


  promeniPrikazPonude(){
    this.prikazPonude = !this.prikazPonude;
  }

  onImageLoad() {
    const canvas = this.canvasRef.nativeElement;
    const image = this.canvasRef.nativeElement.previousElementSibling as HTMLImageElement;

    canvas.width = image.width;
    canvas.height = image.height;

  }

  najjeftinijaPonuda(): number{
    let sum = 0;
    this.produkti.forEach(prod => {
      sum+=Math.min(...prod.ponude.map(ponuda => ponuda.cena));
    })
    return sum;
  }

  najskupljaPonuda(): number{
    let sum = 0;
    this.produkti.forEach(prod => {
      sum+=Math.max(...prod.ponude.map(ponuda => ponuda.cena));
    })
    return sum;
  }

  base64ToBlob(base64: string, contentType: string = ''): Blob {
    const byteCharacters = atob(base64);
    const byteArrays: Uint8Array[] = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);

      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: contentType });
  }


  convertBase64ToImage(slika: string) {
    const contentType = 'image/jpeg'; // Promenite ovo prema tipu vašeg sadržaja
    const base64Data = slika.split(',')[1]; // Uklonite `data:image/jpeg;base64,` deo ako je prisutan
    const blob = this.base64ToBlob(base64Data, contentType);

    // Kreirajte URL za Blob koji možete koristiti za prikaz slike
    this.imgSrc = URL.createObjectURL(blob);
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationId);// Zaustavljanje animacije prilikom uništenja komponente
  }

  drawDot(): void {
    //alert("iscrtavanje canvasa x: " + this.canvasRef.nativeElement.width + " y: " + this.canvasRef.nativeElement.height)
    this.ctx.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);

    //alert(this.canvasRef.nativeElement.width)
    this.produkti.forEach((elem) => {
      this.ctx.beginPath();
      this.ctx.arc(parseInt(elem.tacka[0]), parseInt(elem.tacka[1]), 9, 0, Math.PI * 2);
      this.ctx.fillStyle = 'black';
      this.ctx.fill();
      this.ctx.closePath();
    })

  }

  startGlow(): void {
    this.glowOpacity = 0.1;
    this.growing = true;
    this.animateGlow();
  }

  animateGlow(): void {
    this.ctx.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);
    //alert(this.canvasRef.nativeElement.width + " " + this.canvasRef.nativeElement.height)
    this.drawDot();

    if (this.growing) {
      this.glowOpacity += 0.02;
      if (this.glowOpacity >= 1) this.growing = false;
    } else {
      this.glowOpacity -= 0.02;
      if (this.glowOpacity <= 0.1) this.growing = true;
    }


    this.produkti.forEach((elem) => {
      this.ctx.beginPath();
      this.ctx.arc(parseInt(elem.tacka[0]), parseInt(elem.tacka[1]), 7, 0, Math.PI * 2);
      if (this.izabraniProdukt == elem)
      this.ctx.fillStyle = `rgba(0, 255, 0, ${this.glowOpacity})`;
        else
      this.ctx.fillStyle = `rgba(200, 15, 0, ${this.glowOpacity})`; // Zlatni sjaj
      this.ctx.fill();
      this.ctx.closePath();
    })

    this.animationId = requestAnimationFrame(() => this.animateGlow());
  }


  handleCanvasClick(event: MouseEvent) {
    const canvas = this.canvasRef.nativeElement;
    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    // Provera da li je klik unutar tačke (kruga)
    if (this.isClickInsideCircle(clickX, clickY)) {
      this.onCircleClick(clickX, clickY);
    }
  }

  // Provera da li su koordinate unutar kruga
  isClickInsideCircle(x: number, y: number): boolean {

    return this.produkti.some(elem => {
      const dx = x - parseInt(elem.tacka[0]);
      const dy = y - parseInt(elem.tacka[1]);
      // Proverite da li je rastojanje manje ili jednako poluprečniku (30 u ovom slučaju)
      return (dx * dx + dy * dy <= 30 * 30);
    });
  }


  onCircleClick(x: number, y: number) {


    const container = this.canvasRef.nativeElement.parentElement;

    this.ucitajPonudeZaProizvod(x, y);
  }

  onPonudaSubmitted() {
    this.prikazPonude = false; // Sakrij komponentu nakon submit-a

    this.route.paramMap.subscribe(params => {
      const elementId = params.get('id');

      this.idejaService.dohvatiIdejuPoId(parseInt(elementId!)).subscribe((ideja) => {
        this.ideja = ideja;
        this.convertBase64ToImage(ideja.slika!);
        this.produkti = ideja.produkti;
        // ideja.produkti.forEach((elem) => {
        //   this.produkti.push(elem);
        // })

      })
    })

  }

  ucitajPonudeZaProizvod(x: number, y: number) {

    this.produkti.forEach(elem => {

      const dx = x - parseInt(elem.tacka[0]);
      const dy = y - parseInt(elem.tacka[1]);
      // Proverite da li je rastojanje manje ili jednako poluprečniku (30 u ovom slučaju)
      if (dx * dx + dy * dy <= 30 * 30) {
        this.ponude = elem.ponude;
        this.izabraniProdukt = elem;

        this.minimalnaCenaPonude = Math.min(...this.izabraniProdukt.ponude.map(ponuda => ponuda.cena));
        this.trenutnaDonjaGranica = this.minimalnaCenaPonude;
        this.maksimalnaCenaPonude = Math.max(...this.izabraniProdukt.ponude.map(ponuda => ponuda.cena));
        this.trenutnaGornjaGranica = this.maksimalnaCenaPonude;
      }

    })

  }

  startValue: number = 0;
  endValue: number = 100;

  onValueChangeMin(event: Event) {
    const input = event.target as HTMLInputElement;
    const thumb = input.hasAttribute('matSliderStartThumb') ? 'start' : 'end';
    const value = Number(input.value);

    this.trenutnaDonjaGranica = value;

    this.filterPonude()
  }

  onValueChangeMax(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = Number(input.value);

    this.trenutnaGornjaGranica = value;

    this.filterPonude()
  }


  izaberiProdukt(produkt: Produkt){
    this.izabraniProdukt = produkt;
  }

  filterPonude() {

    this.ponude = []
    this.izabraniProdukt.ponude.forEach(elem => {
      this.ponude.push(elem)
    })

    this.ponude = this.ponude.filter(ponuda =>
      ponuda.cena >= this.trenutnaDonjaGranica && ponuda.cena <= this.trenutnaGornjaGranica
    );
  }

  handleColorChange(event: string): void {
    //alert(this.isColorSimilar(event, "#ff0000", 50))
  }


        isColorSimilar(color1: string, color2: string, threshold: number): boolean {
          // Pretvoriti boje u RGB format
          const rgb1 = this.hexToRgb(color1);
          const rgb2 = this.hexToRgb(color2);

          // Računanje Euclidean distance (Euklidska udaljenost) u RGB prostoru
          const distance = Math.sqrt(
              Math.pow(rgb1.r - rgb2.r, 2) +
              Math.pow(rgb1.g - rgb2.g, 2) +
              Math.pow(rgb1.b - rgb2.b, 2)
          );

          // Provera da li je udaljenost manja od praga (threshold)
          return distance < threshold;
      }

      // Pomoćna funkcija za pretvaranje HEX boje u RGB objekat
      hexToRgb(hex: string): { r: number, g: number, b: number } {
          const bigint = parseInt(hex.substring(1), 16);
          const r = (bigint >> 16) & 255;
          const g = (bigint >> 8) & 255;
          const b = bigint & 255;
          return { r, g, b };
      }


}
