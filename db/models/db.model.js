module.exports = (sequelize, Sequelize) => {
  const Table = sequelize.define("audit_data", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Day: {
      type: Sequelize.INTEGER
    },
    Month: {
      type: Sequelize.INTEGER
    },
    Year: {
      type: Sequelize.INTEGER
    },
    Hour: {
      type: Sequelize.INTEGER
    },
    Minute: {
      type: Sequelize.INTEGER
    },
    Second: {
      type: Sequelize.INTEGER
    },
    Temperature: {
      type: Sequelize.FLOAT
    },
    Pressure: {
      type: Sequelize.FLOAT
    },
    Flow: {
      type: Sequelize.FLOAT
    },
    Total: {
      type: Sequelize.FLOAT
    },
    Valve_1: {
      type: Sequelize.TINYINT
    },
    Valve_2: {
      type: Sequelize.TINYINT
    },
    Valve_3: {
      type: Sequelize.TINYINT
    },
    Valve_4: {
      type: Sequelize.TINYINT
    },
    Valve_5: {
      type: Sequelize.TINYINT
    },
    M_1: {
      type: Sequelize.TINYINT
    },
    M_2: {
      type: Sequelize.TINYINT
    },
    M_3: {
      type: Sequelize.TINYINT
    },
    kw1: {
      type: Sequelize.FLOAT
    },
    kw2: {
      type: Sequelize.FLOAT
    },
    kw3: {
      type: Sequelize.FLOAT
    },
    kwh: {
      type: Sequelize.FLOAT
    },
  });
  return Table;
};
