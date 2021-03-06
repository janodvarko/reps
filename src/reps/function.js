// ReactJS
const React = require("react");

// Reps
const {
  isGrip,
  cropString,
  safeObjectLink,
  wrapRender,
} = require("./rep-utils");

// Shortcuts
const { span } = React.DOM;

/**
 * This component represents a template for Function objects.
 */
FunctionRep.propTypes = {
  object: React.PropTypes.object.isRequired,
  objectLink: React.PropTypes.func,
};

function FunctionRep(props) {
  let grip = props.object;

  return (
    // Set dir="ltr" to prevent function parentheses from
    // appearing in the wrong direction
    span({dir: "ltr", className: "objectBox objectBox-function"},
      getTitle(props, grip),
      summarizeFunction(grip)
    )
  );
}

function getTitle(props, grip) {
  let title = "function ";
  if (grip.isGenerator) {
    title = "function* ";
  }
  if (grip.isAsync) {
    title = "async " + title;
  }

  return safeObjectLink(props, {}, title);
}

function summarizeFunction(grip) {
  let name = grip.userDisplayName || grip.displayName || grip.name || "";
  return cropString(name + "()", 100);
}

// Registration
function supportsObject(grip, type) {
  if (!isGrip(grip)) {
    return (type == "function");
  }

  return (type == "Function");
}

// Exports from this module

module.exports = {
  rep: wrapRender(FunctionRep),
  supportsObject,
};
