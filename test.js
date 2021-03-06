// Создаем функцию, которая отвечает за тренировку модели
async function doTraining(model) {
  // Обозначаем model.fit() и передаем в нее значения x и y
  const history = await model.fit(x, y, {
    epochs: 400, // Количество эпох
    /**
     * Ведем статистику по данной модели
     * Отслеживаем количество эпох и соответствующие потери
     */
    callbacks: {
      onEpochEnd: async (epoch, logs) => {
        console.log('Эпоха:' + epoch + ' Потери:' + logs.loss);
      },
    },
  });
}
// Регаем модель - sequential(). Модель последовательности слоев
const model = tf.sequential();
// Описываем слои
// Слой - dense, где units - количество нейронов и inputShape - форма входного тензора
model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
/**
 * Этап компиляции модели:
 * Тут мы используем функцию потерь - meanSquaredError(), среднеквадратическая ошибка
 * В качестве оптимизатора был использован - sgd(стохастическай градиентный спуск)
 */
model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });
/**
 * Обозначаем структуру и архитектуру элементов.
 * Обозначаем данные входного и выходного значения.
 * Функция(y = 5x - 3).
 * 7 значений для x и y.
 * tensor2d имеет две основные части - сами значения и его размеры[7, 1].
 */
model.summary();
const x = tf.tensor2d([-2.0, -1.0, 0.0, 1.0, 2.0, 3.0, 4.0], [7, 1]); // x
const y = tf.tensor2d([-13.0, -8.0, -3.0, 2.0, 7.0, 12.0, 17.0], [7, 1]); // y
// Активация функции
doTraining(model).then(() => {
  /**
   * После завершения, console.log выводит значения,
   * для которого мы хотим предсказать значение функции.
   * То есть для [11] мы хотим предсказать значение y.
   */
  console.log(model.predict(tf.tensor2d([11], [1, 1])).toString());
});

/**
 * Каждой эпохи соответствует определенный уровень потерь.
 * Все дальше и дальше значения потерь уменьшаются.
 * И в конце то значение alert, расматриваемое в коде, то есть 11 -
 * - предсказывает нам значение для нашей функции.
 * Функция(y = 5x - 3). То есть 5 * 11 = 55, 55 - 3 = 52.
 * В выведенном значении присутвует доля ошибки(погрешность).
 */
