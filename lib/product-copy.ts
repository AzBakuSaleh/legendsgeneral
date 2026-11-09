import type { Locale } from "./i18n";
import type { Product } from "./content";

/** Product-specific editorial text. Verified product data and load classes remain unchanged. */
const productDescriptions: Record<string, { ru: string; en: string }> = {
  "metal-geyim-dolabi": {
    "ru": "Металлический шкаф для раздельного хранения одежды и личных вещей. Свяжитесь с нами, чтобы подобрать конфигурацию с учётом планировки помещения и количества пользователей.",
    "en": "A metal locker for separate storage of clothing and personal belongings. Contact us to choose a configuration suited to your floor plan and number of users."
  },
  "metal-anbar-refi": {
    "ru": "Металлическая стеллажная система для организованного хранения товаров и материалов. Конфигурация полок определяется с учётом нагрузки и размеров помещения.",
    "en": "A metal shelving system for organized storage of goods and materials. Shelf configuration is specified according to the load and dimensions of the space."
  },
  "pul-seyfi": {
    "ru": "Металлический сейф для хранения денег и документов. Сообщите требования к замку, размерам и безопасности, чтобы мы могли предложить подходящий вариант.",
    "en": "A metal safe for storing cash and documents. Share your lock, dimensional and security requirements so we can discuss a suitable option."
  },
  "tibbi-metal-dolab": {
    "ru": "Шкаф для упорядоченного хранения медицинских принадлежностей. Комплектация и пригодность для конкретных условий эксплуатации уточняются при заказе.",
    "en": "A cabinet for organized storage of medical supplies. Configuration and suitability for the intended working conditions are confirmed when ordering."
  },
  "mobil-arxiv-sistemi": {
    "ru": "Передвижные металлические стеллажные блоки на рельсах позволяют компактно хранить документы и папки. Блоки перемещаются вручную с помощью штурвала, открывая проход к нужному ряду. Система изготавливается на заказ по планировке помещения и объёму архива.",
    "en": "Rail-mounted metal shelving units provide compact storage for documents and files. The units are moved using a handwheel to open an aisle where needed. Each system is custom-made for the floor plan and archive capacity."
  },
  "metal-is-masasi": {
    "ru": "Металлический рабочий стол для инструментов и материалов в мастерской. Размеры рабочей поверхности и секции хранения согласовываются по вашим задачам.",
    "en": "A metal workbench for tools and materials in a workshop. Worktop dimensions and storage compartments are discussed according to your requirements."
  },
  "metal-carpayi": {
    "ru": "Изготовление кроватей с металлическим каркасом для жилых и бытовых помещений. Размеры и конструкция уточняются по требованиям заказа.",
    "en": "Metal-frame beds for residential and rest areas. Dimensions and construction are agreed according to the order requirements."
  },
  "metal-masa-oturacaq": {
    "ru": "Металлические основания для офисных столов и стульев изготавливаются на заказ. Деревянная столешница не входит в базовое изделие; форма и размеры каркаса согласуются по проекту.",
    "en": "Custom metal underframes for office tables and seating. Timber tabletops are not included in the base product; frame shape and dimensions are agreed for each project."
  },
  "metal-konstruksiyalar": {
    "ru": "Изготовление и монтаж металлоконструкций для промышленных и гражданских объектов. Размеры, технические требования и объём работ согласуются на основе проекта.",
    "en": "Steel structure fabrication and installation for industrial and civil facilities. Dimensions, technical requirements and scope of work are agreed according to the project."
  },
  "dekorativ-metal-isleri": {
    "ru": "Изготовление металлических изделий под размеры и архитектурный стиль объекта. Отправьте эскиз или фотографию примера, чтобы обсудить детали заказа.",
    "en": "Custom metalwork tailored to the dimensions and design of a space. Send a drawing or reference photo to discuss the project details."
  },
  "quru-soyuducu-konteynerler": {
    "ru": "Изготовление сухогрузных и рефрижераторных контейнеров. Назначение, место размещения и комплектация уточняются при заказе.",
    "en": "Fabrication of dry and refrigerated containers. Intended use, installation conditions and configuration are clarified when ordering."
  },
  "senaye-soyuducu-qapilari": {
    "ru": "Откатные двери для холодильных камер изготавливаются по размерам проёма. Температурный режим, изоляция и условия монтажа уточняются по проекту.",
    "en": "Sliding cold-room doors made to fit the opening. Operating temperature, insulation and installation conditions are specified for each project."
  },
  "yuk-avtomobili-kuzovlari": {
    "ru": "Изготовление кузовов для грузовых автомобилей. Конструкция определяется с учётом характеристик шасси, перевозимого груза и условий эксплуатации.",
    "en": "Truck body fabrication. The structure is specified according to chassis dimensions, intended cargo and operating requirements."
  },
  "metal-direkler": {
    "ru": "Металлические опоры для сетевого и солнечного освещения изготавливаются на заказ. Высота, основание и крепления подбираются по проекту. Комплектация осветительного оборудования согласуется отдельно.",
    "en": "Custom metal poles for mains-powered and solar lighting. Pole height, base and equipment mounts are selected for the project. Lighting equipment configuration is agreed separately."
  },
  "nezaret-kamerasi-direkleri": {
    "ru": "Стальные опоры и крепления на заказ для установки камер видеонаблюдения на открытых территориях. Камеры и их монтаж в данное изделие не входят.",
    "en": "Custom steel poles and brackets for mounting surveillance cameras outdoors. Camera equipment and its installation are not included."
  },
  "bag-ucun-metal-mehsullar": {
    "ru": "Металлоизделия на заказ для садов и зон отдыха на открытом воздухе. Размеры, оформление и технические требования согласуются для каждого изделия.",
    "en": "Custom metalwork for gardens and outdoor leisure spaces. Dimensions, appearance and usage requirements are agreed for each item."
  },
  "metal-emali-xidmetleri": {
    "ru": "Резка, гибка и сварка металлических деталей по чертежам и размерам. Сообщите материал, толщину и объём заказа, чтобы уточнить возможность выполнения работ.",
    "en": "Cutting, bending and welding metal parts to drawings and measurements. Provide the material, thickness and project volume to discuss suitable fabrication services."
  },
  "elektrostatik-toz-boyama": {
    "ru": "Электростатическая порошковая окраска металлических изделий. Укажите размеры деталей, состояние поверхности и необходимый цвет, чтобы получить предложение.",
    "en": "Electrostatic powder coating of metal products. Share the dimensions, current surface condition and required colour to request a quote."
  }
};

export function localizedProductDescription(locale: Locale, product: Product): string {
  if (locale === "az") return product.description;
  if (product.capacity) {
    const { perShelf, total } = product.capacity;
    return locale === "ru"
      ? `Класс нагрузки: ${perShelf} кг на одну полку и ${total} кг на стеллаж целиком. Количество полок, распределение нагрузки и комплектация уточняются при заказе.`
      : `Load class: ${perShelf} kg per shelf and ${total} kg for the full shelving unit. Shelf count, load distribution and final configuration are confirmed when ordering.`;
  }
  return productDescriptions[product.slug]?.[locale] ?? product.description;
}
